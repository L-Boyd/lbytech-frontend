# Mybatis

## 常用注解

+ @MapperScan("com.lbytech.project.mapper")
  + 写在启动类上
  + 扫描mapper接口





# Mybatis -Plus

## 使用

1. 引入依赖：mybatis-plus-boot-starter

   + 内就包含了mybatis的包

2. 自定义Mapper继承MybatisPlus提供的BaseMapper接口

   ```java
   public interface UserMapper extends BaseMapper<User> {//基于反射获取实体类信息作为数据库表信息
       
   }
   ```

   + 类名驼峰转下划线作为表名，或在实体类中加@TableName(value = "table_name")
   + 名为id的字段作为主键
   + 变量名驼峰转下划线作为表的字段名

3. 使用

   + ```java
     List<User> users = userMapper.selectBatchIds(List.of(1L, 2L, 3L, 4L));
     users.forEach(System.out::println);
     
     User user = new User("tom", "male");
     userMapper.insert(user);
     ```



## 常用注解

1. @TableName：指定表名

   + 类名和表名不一样时使用

2. @TableId：指定表主键字段

   + @TableId(value="id", type=IdType.AUTO)
     + AUTO：数据库自增长
     + INPUT：通过set方法自行输入
     + ASSIGN_ID（默认）：用接口IdentifierGenerator的方法nextId来生成id，默认实现类未DefaultIdentifierGenerator，雪花算法

3. @TableField：指定表中普通字段

   + ```java
     @TableField("is_married")
     private Boolean isMarried;

   + 成员变量名与数据库字段名不一致时使用

   + 成员变量以id开头，且是boolean时使用

   + 成员变量名与数据库关键字冲突（如order）

     + ```java
       @TableField("`order`")
       private Integer order;
       ```

   + 成员变量在数据库中不存在

     + ```java
       @TableField(exist = false)
       private String address;
       ```



## 核心功能

### 条件构造器

+ QueryWrapper：主要构建select、update、delete的where条件部分

  + 查询出名字中带o，存款大于等于1000元的人的id、username、info、balance字段

    ```sql
    select id,username,info,balance
    from user
    where username like '%o%' and balance >= 1000
    ```

    ```java
    void testQueryWrapper () {
        // 1.构造查询条件
        QueryWrapper<User> wrapper = new QueryWrapper<>()
            .select("id","username","info","balance")
            .like("username","o")
            .ge("balance",1000);
        // 2.查询
        List<User> users = userMapper.selectList(wrapper);
    }
    ```

    

  + 更新用户名为jack的用户的余额为2000

    ```sql
    update user
    set balance = 2000
    where username = "jack"
    ```

    ```java
    void testUpdateByQueryWrapper() {
        // 1.要更新的数据
        User user = new User();
        user.setBalance(2000);
        // 2.构造查询条件
        QueryWrapper<User> wrapper = new QueryWrapper<>()
            .eq("username","jack");
        // 3.执行更新
        userMapper.update(user, wrapper)
    }
    ```

+ UpdateWrapper

  + 更新id为1，2，4的用户的余额，扣200

    ```sql
    update user
    set balance = balance - 200
    where id in (1, 2, 4)
    ```

    ```java
    void testUpdateWrapper() {
        List<Long> ids = List.of(1L, 2L, 4L);
        UpdateWrapper<User> wrapper = new UpdateWrapper<>()
            .setSql("balance = balance - 200")
            .in("id", ids)
        userMapper.update(null, wrapper)
    }
    ```

+ LambdaQueryWrapper：QueryWrapper的Lambda形式，避免硬编码

  + 把上面的QueryWrapper改为LambdaWrapper

    ```java
    void testLambdaQueryWrapper () {
        // 1.构造查询条件
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>()
            .select(User::getId, User::getUsername, User::getInfo, User::getBalance)
            .like(User::getUsername, "o")
            .ge(User::getBalance,1000);
        // 2.查询
        List<User> users = userMapper.selectList(wrapper);
    }
    ```






### 自定义SQL

用Wrapper构造where条件，其他的自己写 

+ 将指定范围的用户的余额扣减指定值

  ```xml
  <update id="updateBalanceByIds">
  	update user
  	set balance = balance - #{amount}
  	where id in
  	<foreach collection="ids" separator="," item="id" open="(" close")">
  		#{id}
  	</foreach>
  </update>
  ```

  1. 基于Wrapper构建where条件

     ```java
     void testCustomSqlUpdate() {
         List<Long> ids = List.of(1L, 2L, 3L, 4L);
         int amount = 200;
         // 1.构造条件
         LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>().in(User::getId, ids);
         // 2.自定义SQL方法调用
         userMapper.updateBalanceByIds(wrapper, amount);
     }
     ```
  
  2. 在mapper方法参数中用Param注解声明wrapper变量名称，必须是ew或Constants.WRAPPER
  
     ```java
     void updateBalanceByIds(@Param("ew") LambdaQueryWrapper<User> wrapper, @Param("amount") int amount);
     ```
  
  3. 自定义SQL，并使用Wrapper条件
  
     ```xml
     <update id="updateBalanceByIds">
     	update tb_user set balance = balnace - #{amount} ${ew.customSqlSegment}
     </update>
     ```





### Service接口

Iservice

+ save(T)：保存
  + saveBatch(Collection<T>)：批量保存
  + saveOrUpdate(T)：有就更新，没有就保存
+ removeById(Serializable)：删除
  + removeByIds()：批量删除
  + removeBatchByIds：批量删除，批量发送，效率更高
+ update()：更新
+ getById()：查单个
  + getOne()
+ listByIds()：查多个
+ count()：查数量
+ page()：查分页
+ lambdaQuery()
  + lambdaUpdate()



#### 使用

UserService接口继承IService接口，UserServiceImpl实现类实现UserService继承ServiceImpl

```java
public interface IUservice extends IService<User> {
    
}
```

```java
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUservice {
    
}
```

```java
Class IUserServiceTest{
    
    @Autowired
    private IUserService userService;
    
    @Test
    void testSaveUser() {
        User user = new User();
        user.setUsername("Tom");

        userService.save(user)
    }
}

```



#### Lambda查询

```java
Controller

@ApiOperation("根据复杂条件查询用户")
@GetMapping("/list")
public List<UserVo> queryUsers(UserQuery query) {
    List<User> users = userService.queryUsers(query.getName(), query.getStatus, query.getMaxBalance, query.getMinBalance);
    return BeanUtil.copyToList(users, UserVO.class);
}
```

```java
ServiceImpl
    
public List<User> queryUsers(String name, Integer status,Integer minBalance, Integer maxBalance ) {
    
    List<User> users = lambdaQuery()
        .like(name != null, User::getUsername, name)
        .eq(status != null, User::getStatus, status)
        .ge(minBalance != null, User::getBalance, minBalance)
        .le(maxBalance != null, User::getBalance, maxBalance)
        .one()/.list()/.page()/.exist();
    return users;
}
```

```java
lambdaUpdate()
    .set(User::getBalance, remainBalance)
    .eq(User::getId, id)
    .
```

