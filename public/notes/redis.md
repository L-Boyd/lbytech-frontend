# 介绍

redis是NoSQL（非关系型数据库）数据库，存放键值对

SQL(Structed结构化  ：关系型数据库



# 后台启动

备份配置文件

```
cp redis.conf redis.conf.bck
```

修改配置文件

```
vi redis.conf

# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes 
# 密码，设置后访问Redis必须输入密码
requirepass 1212qweasdzxc

#其他常见配置
# 监听的端口
port 6379
# 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录
dir .
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
databases 1
# 设置redis能够使用的最大内存
maxmemory 512mb
# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```

启动

```
# 进入redis安装目录 
cd /usr/local/src/redis-6.2.6
# 启动
redis-server redis.conf
```

停止

```
# 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，
# 因为之前配置了密码，因此需要通过 -u 来指定密码
redis-cli -u 123321 shutdown
```



# 数据结构

## 基本类型

| 名字      | 形式                 |
| --------- | -------------------- |
| String    | hello world          |
| Hash      | {name:"jack, age:21} |
| List      | [A -> B -> C -> C]   |
| Set       | {A, B, C}            |
| SortedSet | {A: 1, B: 2, C: 3}   |

## 特殊类型

| 名字                      | 形式                |
| ------------------------- | ------------------- |
| GEO（地理位置，经度纬度） | {A:(120.3, 30.5)}   |
| BitMap                    | 0110110101110101011 |
| HyperLog                  | 0110110101110101011 |

## key的层级结构

项目名:业务名:类型:id



# 命令

## generic

| 命令   | 用途                                         |
| ------ | -------------------------------------------- |
| keys   | 查看符合模板的所有key                        |
| del    | 删除一个指定的key                            |
| exists | 判断key是否存在                              |
| expire | 给key设置有效期，有效期到期时key会被自动删除 |
| ttl    | 查看一个key的剩余有效期                      |



## String

字符、整型、浮点型

| 命令         | 含义                                     |
| ------------ | ---------------------------------------- |
| set          | 添加或修改已存在的一个String类型的键值对 |
| get          | 根据key获取value                         |
| mset         | 添加多个键值对                           |
| mget         | 根据多个key获取多个value                 |
| incr         | 让一个整型的key自增1                     |
| increby      | 让一个整型的key自增指定步长              |
| increbyfloat | 让一个浮点类型的数字自增指定步长         |
| setnx        | 添加一个键值对，若存在则不执行           |
| setex        | 添加键值对，并指定有效期                 |



## Hash

散列，value是一个无序字典，类似于HashMap

| 命令                 | 执行                             |
| -------------------- | -------------------------------- |
| hset key field value | 添加或修改hash类型key的field的值 |
| hget key field       | 获取一个key的field值             |
| hmset                | 添加多个key的field值             |
| hmget                | 获取多个key的field值             |
| hgetall              | 获取一个key中所有的field和value  |
| hkeys                | 获取key中所有的field             |
| hvals                | 获取key中所有的value             |
| hincryby             | 让一个key的字段值自增并指定步长  |
| hsetnx               | field不存在则添加                |



## List

与LinkedList类似，可看作一个双向链表；特征：有序、元素可重复、插入删除速度快、查询速度一般

| 命令                | 执行                                                         |
| ------------------- | ------------------------------------------------------------ |
| lpush key element   | 向列表左侧插入一个或多个元素                                 |
| lpop key            | 移除并返回列表左侧第一个元素，没有则返回nil                  |
| rpush key element   | 向列表右侧插入一个或多个元素                                 |
| rpop key            |                                                              |
| lrange key star end | 返回一段角标范围内的所有元素                                 |
| blpop和brpop        | 与lpop和rpop类似，但在没有元素时等待指定时间，而不是直接返回nil |



## Set

与HashSet类似，可看作一个value为null的HashMap。特征（与HashSet类似）：无序、元素不可重复、查找快、支持交集并集差集等功能

| 命令                   | 含义                                 |
| ---------------------- | ------------------------------------ |
| sadd key member ...... | 向set中添加一个或多个元素            |
| srem key memver        | 移除set中的指定元素                  |
| scard key              | 返回set中元素的个数                  |
| sismember key member   | 判断一个元素是否在set中              |
| smembers               | 获取set中所有的元素                  |
|                        |                                      |
| sinter key1 key1       | 求key1与key2的交集                   |
| sdiff key1 key2        | 求key1与key2的差集（key1有key2没有） |
| sunion key1 key2       | 求并集                               |



## SortedSet

可排序的set集合，与TreeSet类似，底层数据结构差别很大（TreeSet是红黑树）。SortedSet中的每个元素都有一个score属性，可以基于score属性对元素排序，底层实现是一个跳表（SkipList）加hash表。特性：可排序、元素不重复、查询速度快。

| 命令                        | 含义                                          |
| --------------------------- | --------------------------------------------- |
| zadd key score member       | 添加一个或多个元素，如果已经存在则更新score值 |
| zrem key member             | 删除一个指定元素                              |
| zscore key member           | 获取指定元素的score值                         |
| zrank key member            | 获取指定元素的排名                            |
| zcard key                   | 获取元素个数                                  |
| zcount key min max          | 统计score值在给定范围内的所有元素的个数       |
| zincrby key increment memer | 让指定元素自增，步长为指定的increment值       |
| zrange key min max          | 按照score排序后，获取指定排名范围内的元素     |
| zrangebyscore key min max   | 按照score排序后，获取指定score范围内的元素    |
| zdiff、zinter、zunion       | 求差集、交集、并集                            |

排名默认升序，如果要降序，则在命令的z后面添加rev



# SpringDataRedis

1. 引入spring-boot-starter-daya-redis依赖

2. 在application.yml配置redis信息

3. 注入RedisTemplate

   

| API                         | 返回值类型      | 说明                  |
| --------------------------- | --------------- | --------------------- |
| redisTemplate.opsForValue() | ValueOperations | 操作String类型数据    |
| redisTemplate.opsForHash()  | HashOperations  | 操作Hash类型数据      |
| ......                      |                 |                       |
| redisTemplate.iosForZSet()  | ZSetOperations  | 操作SortedSet类型数据 |
| redisTemplate               |                 | 通用命令              |



# 问题

## 缓存穿透

### 定义：

指客户端请求的数据在缓存和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库。

### 常见解决方案：

被动：

+ 缓存空对象：
  + 优点：实现简单，维护方便
  + 缺点：额外的内存消耗、可能造成短期的不一致
+ 布隆过滤
  + 优点：内存占用较小，没有多余的key
  + 缺点：实现复杂、存在误判可能

![Snipaste_2025-02-22_15-28-28](D:\BaiduSyncdisk\typora笔记本\img\redis\Snipaste_2025-02-22_15-28-28.png)

主动：

+ 增强id的复杂度，避免被猜到id规律
+ 做好数据的基础格式校验
+ 加强用户权限校验
+ 做好热点参数的限流



## 缓存雪崩

### 定义：

同一时段大量的缓存key同时失效或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力

### 解决方案

+ 给不同的key的TTL添加随机值
+ 利用Redis集群提高服务的可用性
+ 给缓存业务添加降级限流策略
+ 给业务添加多级缓存



## 缓存击穿

### 定义

缓存击穿问题也叫热点key问题，就是一个被高并发访问并且缓存重建业务较复杂的key突然失效了，无数的请求访问会在瞬间给数据库带来巨大的冲击

### 解决方案

+ 互斥锁
+ 逻辑过期

![Snipaste_2025-02-22_20-43-59](D:\BaiduSyncdisk\typora笔记本\img\redis\Snipaste_2025-02-22_20-43-59.png)

![Snipaste_2025-02-22_20-44-36](D:\BaiduSyncdisk\typora笔记本\img\redis\Snipaste_2025-02-22_20-44-36.png)



