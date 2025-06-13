# JAVA

## 背景知识

### JVM、JDK、JRE

- JVM:java virtual machine
- JRE:java runtime environment

	- JVM+JAVA核心库

- JDK:java development kit

	- JRE+java开发工具（javac、java、javap、javadoc)

### 版本

- SE:standard edition
- EE:enterprise edition
- ME:micro edition

### 产生文件

- 源文件

	- .java

- 字节码文件

	- .class

### 路径

- 相对路径

	- 从当前目录开始定位，形成一个相对路径

- 绝对路径

	- 从顶级目录（D、C）开始定位

- ..\..\

	- 上上级目录

## 快捷键

### 减缩进

- shift+tab

### 将代码包围

- alt+shift+t

### 删除行

- ctrl+d

### 复制当前行

- ctrl+alt+下箭头

### 补全代码

- alt+/

### 注释

- ctrl+/

### 格式化

- ctrl+alt+l

### 生成构造器

- alt+insert

	- generate

- 右键

### 查看继承关系

- ctrl+H

### 包围代码块

- ctrl+alt+t

## 语法

### 转义符

- \t

	- 一个制表位

- \n

	- 换行

- \\

	- 一个\

- \"

	- 一个"

- \r

	- 回车（将光标移到当前行最前面，从第一个字符开始替换）

		- 北京\r南 => 南京

### 注释

- 单行注释

	- //

- 多行注释

	- /*
    多行注释
  */

- 文档注释

	- /**
    *@author lby
    *@version 1.0.0
		*/

		- 编译：java -d :\\文件夹地址 -author -version 源代码.java
		- @author为javadoc标签

### 三元运算符

- 细节

	- 看作一个整体，会自动提升精度（因为要确保两个分支的结果类型相同）

		- Object obj1 = true? new Integer(1) : new Double(2.0);
			System.out.println(obj1);

			- 会输出1.0

## 标识符

### 定义

- 可以自己起名字的地方

### 规则

- 特殊字符可用_和$
- 不能用关键字和保留字，但可以包含
- 不能以数字开头

### 规范

- 包

	- 多单词组成时，全小写，如com.lby.xx

- 类、接口

	- 多单词组成时，首字母大写，如TankShotGame

- 变量、方法

	- 首字母小写，后续首字母大写，如tankShotGame

- 常量

	- 全大写，下划线连接，如TANK_RATE

## 类(class)

### 定义

- 自定义的数据类型

### 对象

- 对象是类的实例，类是对象的模版

### 语法

- 定义

	- class Cat {
    String name;
    int age;
    String color;
  }

- 创建实例

	- Cat cat1 = new Cat();
cat1.name = "Tom";
cat1.age = 3;
cat.color = "white";

- 访问属性

	- System.out.println(cat1.name)

### 内存布局

- 

### 方法

- 方法重载（OverLoad）

	- 同一类中，多个同名方法，形参列表不一致

		- public int add(int n1, intn2){
    return n1+n2;
}
public double add(int n1, double n2){
    return n1+n2;
}

- 可变参数

	- 将多个同名同功能但参数个数不同的方法封装成一个方法

		- public int sun(int ...nums){
    	res = 0;
    	for(int i = 0; i < nums.length; i++){
        res += nums[i];
    	}
    	return res;
			}

			- nums需传入数组
			- 可变参数和普通参数可以一起出现在形参列表，但一定要在最后，最多只有一个可变参数

				- (int n1, int...n2)

## 异常

### 类型

- 自定义异常

	- class AgeException extends RuntimeException{
    public AgeException(String message){//构造器
        super(message);
    }
  }
  main:
  int age = 180;
  if (!(age>=18 && age <= 120)){
    throw new AgeException("年龄要在18~120之间");
  }
  System.out.println("年龄输入正确");

- Throwable

	- 错误（Error）

		- JVM无法解决的问题，如JVM系统内部错误、资源耗尽等严重情况

	- 异常(Exception)

		- 编译时异常

			- 编译时编译器检查出的异常

				- SQLException

					- 操作数据库时，查询表可能发生异常

				- IOEException

					- 操作文件时发生的异常

				- FileNotFoundException

					- 操作不存在的文件

				- ClassNotFoundException

					- 加载不存在的类

				- EOFException

					- 操作文件，到文件末尾时发生异常

				- IllegalArgumentException

					- 参数异常

		- 运行时异常

			- 运行时发生的异常

				- 例

					- RuntimeException

						- NullPointerException

							- 空指针异常，需要对象的地方为null

						- ArithmeticException

							- 数字运算异常，如除零

						- ArrayIndexOutOfBoundsException

							- 数组下标越界异常

						- ClassCastException

							- 类型转换异常

						- NumberFormatException

							- 数字格式不正确异常（字符串转为数值类型时，字符串格式不对）

				- 由默认处理机制，不要求程序员必须处理

### 处理

- try-catch-finally

	- try{
    可能发生异常的代码
	}
	catch (Exception e){
    得到异常对象，程序员处理
	}
	finally{
    不管是否发生异常，都执行
	}

		- 细节

			- 发生异常时，系统将异常信息封装成Exception对象e，传递给catch
			- 异常发生时，try后续代码不再执行，直接进入catch
			- return情况

				- catch和finally中都有return：返回finally中的内容
				- catch中有return,finally中没有return：将catch中要return的值存到temp，执行finally，再返回temp

- throws

	- public void f throws Exception

		- Exception可写异常类型或其父类，或异常列表
		- 将错误扔给调用者，由调用者用try-catch解决错误
		- 子类重写方法抛出的异常必须和父类抛出的异常一致，或为其子类

## 常用类

### 包装类（Wrapper）

- 含义：针对八种基本数据类型的引用类型

	- 基本数据类型

		- booolean
		- char
		- byte
		- short
		- int
		- long
		- float
		- double

	- 包装类

		- Boolean
		- Character

			- 常用方法

				- .isDigit('a')

					- 判断是不是数字

				- .isLetter('a')

					- 判断是不是字母

				- .isUpperCase('a');

					- 判断是不是大写

				- .isLowerCase('a')

					- 判断是不是小写

				- .isWhitespace('a')

					- 判断是不是空格

				- .toUpperCase('a')

					- 转成大写

				- .toLowerCase('a')

					- 转成小写

		- 父类为Number

			- Byte
			- Short
			- Interger

				- 判断Integer是否相等

					- Integer i1 = 127;
			Integer i2 = 128;
			Integer i3 = Integer.valueOf(127);
			Integer i4 = new Integer(127);
			int i5 = 127;
			Integer i6 = new Integer(127);
			Integer i7 = 127;
			Integer i8 = 128;

						- 只要有基本数据类型，判断值

							- i1 == i5 //:true

						- new了就不是一个对象

							- i4 == i6 //：false

						- 自动装箱(Integer.valueOf(xx))在-128~127之间值相等即为一个对象

							- i1 == i7 //：true
							- i2 == i8//:false

				- 常用方法

					- .MIN_VALUE

						- 返回最小值

					- .MAX_VALUE

						- 返回最大值

			- Long
			- Float
			- Double
			- 

				- 绿线为实现
				- 蓝线为继承

- 好处

	- 有了类的特点，就可以调用类中的方法

- 包装类和基本数据类型的转换

	- 装箱

		- 基本类型->包装类型

	- 拆箱

		- 包装类型->基本类型

	- jdk5前

		- 手动装箱

			- 例

				- int n1 = 100;


					- Integer integer1 = new Interger(n1);
					- Integer interger2 = Integer.valueOf(n1);
	
						- 底层：若-128<n1<127,则不new Integer
	
		- 手动拆箱
	
			- int i = integer1.intValue();
	
	- jdk5(含)后
	
		- 自动装箱
	
			- 底层调用的是valueOf方法
	
				- 比如Interger.valueOf()
	
					- 例
	
						- int n2 = 200;
Integer integer3 = n2;

		- 自动拆箱
	
			- int n3 = integer3;

### String系列

- String

	- 底层

		- 编码

			- Unicode

				- 一个字符两个字节

		- 实现

			- Serializable（串行化）

				- 可在网络传输

			- Comparable

				- 可相互比较

			- CharSequence

		- final类，不可被继承
		- 存储

			- private final char value[];

				- final：赋值后（地址）不可修改

					- final char[] c1 = {'1','2'};
				char[] c2 = {'3','4'};

						- c1[0] = '3'

							- 可行

						- c1 = c2;

							- 报错

					- String a = "aa";
					a = "bb";

						- 在常量池中创建了两个对象

	- 包装类与String之间转换

		- Integer->String

			- Integer i = 100;

				- String str1 = i + "";
				- String str2 = i.toString;
				- String str3 = String.valueOf(i);

		- String->Integer

			- String str4 = "12345";

				- Integer i2 = Integer.parseInt(str4);
				- Integer i3 = new Integer(str4);

	- 字符串常量

		- String name = "Tom";

			- "Tom"是字符串常量

	- 创建

		- String s = "lby"

			- 先从常量池查看是否有”lby"数据空间，如果有，直接指向；如果没有，则重新创建，然后指向。s最终指向的是常量池的空间地址

		- 构造器

			- 种类

				- new String()
				- new String(String original)
				- new String(char[] a)
				- new Stirng(char[] a, int startIndex, int count)
				- new String(byte[] a)

			- 先在堆中创建空间，里面维护了value属性，指向常量池的lby空间。如果常量池没有“lby”，重新创建，如果有，直接通过value指向，最终指向的是堆中的空间地址

		- 相加

			- String s1 = “ab"+"cd"

				- 常量相加指向池

			- String s2 = “ab";
		String s3 = "cd";
		String s4 = s2 + s3

				- 变量相加指向堆

		- 子主题 5

	- 内存布局

		- 
		- 

	- 方法

		- intern()

			- String a = "lby";
				String b = new String("lby);

				- sout(a == b.intern());


					- true(.intern()返回常量池中的地址）
	
				- sout(b == b.intern());
	
					- false
	
		- equals
	
			- 区分大小写，判断内容是否相等
	
		- equalslgnoreCase
	
			- 忽略大小写，判断内容是否相等
	
		- length
	
			- 获取字符的个数，字符串的长度
	
		- indexOf
	
			- 获取字符（或字符串）在字符串中第一次出现的索引，索引从0开始，如果找不到，返回-1
	
		- lastIndexOf
	
			- 获取字符在字符串中最后一次出现的索引，索引从0开始，如果找不到，返回-1
	
		- substring
	
			- 截取指定范围的子串
	
				- String name = "hello,zhangsan";
	
					- name.substring(6)
	
						- 从第六位开始，截取到结束=>zhangsan
	
					- name.substring(0,5)
	
						- 从索引0开始截取，截取到第五个字符，不包含第五个
	
		- trim
	
			- 去除前后空格
	
		- charAt
	
			- 获取某索引处的字符，注意不能使用Str[index]这种方式
	
		- toUpperCase()
	
			- 将字符串全部变成大写
	
		- toLowerCase
	
			- 将字符串全部变成小写
	
		- concat
	
			- 字符串拼接
	
		- replace
	
			- 字符串替换（不改变原字符串）
	
				- s1 = s1.replace("a", "b")
	
					- 将s1中所有的a替换为b
	
		- split
	
			- 分割字符串，对某些分割字符需要用转义\(\\要写成\\\\)
	
				- String poem = "锄禾日当午，汗滴禾下土";
String[] splitpoem = poem.spilt(",");

		- toCharArray
	
			- 将字符串转换为字符数组
	
		- compareTo
	
			- 比较两字符串的大小，前者大返回正数，后者大返回负数
	
				- 长度相同，每个字符都相同，返回0
				- 长度相同和不相同，比较时可区分大小，返回ASCII码相减
				- 长度不同，前面部分都相同，返回长度相减值
	
		- format
	
			- 格式化内容
	
				- String info = String.format("姓名是%s，年龄是%d，成绩是%.2f，性别是%c",name,age,score,gender)
或
String formatStr = “姓名是%s，年龄是%d，成绩是%.2f，性别是%c”；
String info = String.format(formatStr，性别是%c",name,age,score,gender);

- StringBuffer

	- 底层

		- final类不可被继承
		- 实现了Serializable，可以保存到文件或网络传输
		- 继承了抽象类AbstractStringBuilder，属性char[] value存放字符序列

			- 不是final,而String中的value是final

				- String的更新是更改地址，效率较低

	- 创建

		- StringBuffer sb1 = StringBuffer()

			- 16个字符

		- StringBuffer sb1 =StringBuffer(100)

			- 100个字符

		- StringBuffer sb1 =StringBuffer("hello")

			- 5+16个字符

	- 转换

		- String -> StringBuffer

			- String str = "hello";
StringBuffer strbuf = new StringBuffer(str);
			- StringBuffer strbuf2 = new StringBuff();
strbuf2 = strbuf2.append(str);

		- StringBuffer -> String 

			- StringBuffer strbuf = StringBuffer("hello");
	String s = strbuf.toString();
			- String s2 = new String(strbuf)

	- 方法

		- append

			- 追加内容

		- delete

			- 删除内容

				- strbuf.delete(11,14)

					- 删除索引[11,14)处的字符

		- replace

			- 替换内容

				- strbuf.replace(11,14,"a")

					- 将[11,14)处的字符换为"a"

		- indexOf

			- 查找子串在字符串中第一次出现的索引，找不到返回-1

		- insert

			- 插入

				- strbuf.insert(9,"aa")

					- 在索引为9的位置插入"aa"，原来索引为9的内容后移

		- .length()

			- 返回长度

- StrinigBuilder

	- 底层

		- final类不可被继承
		- 实现了Serializable，可以保存到文件或网络传输
		- 继承了抽象类AbstractStringBuilder，属性char[] value存放字符序列

			- 字符序列存放在堆中

		- 可变的字符序列
		- 提供与StringBuffer兼容的API
		- 不保证同步（不是线程安全）

			- StringBuilder的方法没有做互斥的处理，即没有synchronized关键字，因此在单线程情况下才使用

		- 大多数实现中，比StringBuffer快

- 三者对比

	- String

		- 不可变字符序列，效率低，但复用率高

	- StringBuffer

		- 可变字符序列，（增删）效率较高，线程安全

	- StringBuilder

		- 可变字符序列，效率最高，线程不安全

### Math

- 方法（均为静态）

	- Math.abs(-9)

		- 求绝对值

	- .pow(2,5)

		- 求2的5次方

	- .ceil(-3.001)

		- 向上取整，返回>=该参数的最小整数（转成double）

	- .floor(-4.99)

		- 向下取整，返回<=该参数的最大整数（转成double）

	- round(-5.001)

		- 四舍五入（该参数加0.5），再转换成long

	- .sqrt(9.0)

		- 求根号（开方）

	- .random()

		- 返回[0,1)之间的随机小数

			- 要得到一个[a,b]之间的随机数

				- (int)(a + Math.random() * (b - a + 1))

	- .max()

		- 返回两数最大值

	- .min()

		- 返回两数最小值

### Arrays

- 包含一系列静态方法，用于管理或操作数组

	- Arrays.toString(int[] arr)

		- 将数组转换为字符串

	- sort

		- 自然排序（从小到大）

			- Arrays.sort(arr)

		- 定制排序(从大到小)

			- Arrays.sort(arr, new Comparator() {
    		public int compare(Object o1, Object o2) {
    		Integer i1 = (Integer) o1;
    		Integer i2 = (Integer) o2;    
    		return i2 - i1;
		}

				- 1.排序数组
				- 2.实现Comparator接口的匿名内部类，要求实现compare方法

	- binarySearch(arr, 1)

		- 二分搜索法进行查找，要求必须排序好，不存在则返回-(应该在的位置+1）

	- Integer[] newArr = Arrays.copyOf(arr, arr.length)

		- 从arr数组中，拷贝arr.length个元素到newArr数组中，如果拷贝长度>arr.length,则多的为null

	- .fill(arr, 99)

		- 将arr所有元素替换为99

	- Arrays.equals(arr, arr2)

		- 元素一样则返回true

	- List al = Arrays.asList(2,3,4,5,6,1)

		- 将数据转换为集合
		- al编译类型：List（接口）
运行类型：java.util.Arrays#ArrayList

### System

- 方法

	- exit

		- 退出当前程序

			- System.exit(0)正常退出，0表示一个状态

	- arraycopy(原数组, 从原数组哪个索引开始拷贝, 目标数组, 拷贝到目标数组的哪个索引, 拷贝多少个)

		- 复制数组元素，比较适合底层调用，一般用Arrays.copyOf完成数组复制，要拷贝的数目超出原数组，则报错

	- currentTimeMillens()

		- 返回当前时间距离1970-1-1的毫秒数

	- gc

		- 运行垃圾回收机制

### 大数处理

- BigInteger

	- 创建

		- BigInteger bi = new BigInteger("99999999999999999");
BigInteger bi2 = new BigInteger("99999999999999999");

	- 方法

		- bi = bi.add(bi2)

			- 加法

		- bi = bi.subtract(bi2)

			- 减法

		- bi = bi.multiply(bi2)

			- 乘法

		- bi = bi.divide(bi2)

			- 除法

- BigDecimal

	- 创建

		- BigDecimal bc = new BigDecimal("1991.2222244414141427899")
	BigDecimal bc2 = new BigDecimal("1991.2222244414141427899")

	- 方法

		- bc = bc.add(bc2)

			- 加法

		- bc = bc.subtract(bc2)

			- 减法

		- bc = bc.mutiply(bc2)

			- 乘法

		- bc = bc.divide(bc2)

			- 除法，除不尽会报错

				- 指定精度

					- bc = bc.divide(bc2, BigDecimal.ROUND_CEILING)

						- 保留分子精度

### 日期

- Date (java.util包)

	- 精确到毫秒，代表特定的瞬间
	- 应用

		- Date d1 = new Date();

			- 获取当前时间

		- SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 hh:mm:ss E");
	String format = sdf.format(d1);

			- 将日期格式化

				- 

		- String s = "2003年09月19日 19:19:19 星期一";
		Date d2 = sdf.parse(s);

			- 把一个格式化的String转换成对应的Date

- Calendar

	- 底层

		- Calendar是一个抽象类，构造器是private的
		- 可通过getInstance()来获取实例
		- 提供大量的方法和字段以供使用

	- 应用

		- Calendar c = Calendar.getInstance();
		- sout(c.get(Calendar.YEAR) + "年" )

			- 没有格式化方法

		- sout((c.get(Calendar.MONTH)+1) + "月" )

			- 默认0-11

		- sout(c.get(Calendar.DAY_OF_MONTH) + "日" )
		- sout(c.get(Calendar.HOUR) + "时" )

			- c.get(Calendar.HOUR_OF_DAY):二十四小时制

		- sout(c.get(Calendar.MINUTE) + "分" )
		- sout(c.get(Calendar.SECOND) + "秒" )

	- 问题

		- 可变性

			- 像日期和时间这样的类应该是不可变的，但在Calendar中可变

		- 偏移性

			- Date中的年份是从1900开始的，而月份都是从0开始

		- 格式化

			- 格式化只对Date月

		- 不是线程安全
		- 不能出利润秒（每两天多一秒）

- Local（第三代日期类）

	- LocalDate

		- 年月日

	- LocalTime

		- 时分秒

	- LocalDateTime

		- 年月日时分秒
		- 应用

			- LocalDataTime ldt = LocalDateTime.now();
			- sout(ldt.getYear() + "年" )
			- 月

				- sout(ldt.getMonth() + "月" )
				- sout(ldt.getMonthValue() + "月" )

			- sout(ldt.getDayOfMonth() + "日" )
			- sout(ldt.getHour() + "时" )
			- sout(ldt.getMinute() + "分" )
			- sout(ldt.geSecond() + "秒" )
			- plus

				- LocalDateTime ldt2 = ldt.plusDays(890)

					- ldt2为890天后的日期
					- plusYear和其他同理

			- minus

				- LocalDateTime dlt3 = ldt.minusDays(13)

					- 13天前的日期

		- 格式化

			- DateTimeFormatter dtf = DateTimeFormatter .ofPattern("yyyy年MM月dd日 hh:mm:ss E")
			- String format = dtf.format(ldt);

	- Instant时间戳

		- Instant n = Instant.now();
		- Instant->Date

			- Date d = Date.from(now);

		- Date->Instant

			- Instant i = d.toInstant()

## 集合

### 数组不足

- 长度开始时必须指定，且不能更改
- 保存的必须为同一类型元素
- 增加、删除元素麻烦

### 集合优势

- 可以动态保存任意多个对象
- 提供了一系列操作对象的方法
- 添加删除元素代码简洁

### 集合类图

- 单列集合

	- 

- 双列集合（键值对形式 K-V)

	- 

### Collection

- 特点

	- 有些可以存放重复元素，有些不可以
	- 没有直接的实现子类，通过子接口List和Set实现

- 方法

	- .add

		- 添加元素

			- list.add("lby");
list.add(10);
list.add(true);

	- .remove()

		- 删除元素

			- list.remove(0)

				- 删除第0个元素

			- list.remove("lby")

				- 删除“lby”

	- .contains("lby")

		- 查找元素是否存在

	- .size()

		- 返回元素个数

	- .isEmpty()

		- 看集合是否为空

	- .clear()

		- 将集合清空

	- .addAll(list2)

		- 添加多个元素

	- .containsAll(list2)

		- 查看多个元素是否都存在

	- .removeAll(list2)

		- 将list2中内容全部删除

- List

	- 特点

		- **有序的（添加顺序和取出顺序一致）,且可重复**
		- 支持索引

	- ArrayList

		- 底层

			- 由数组实现

				- transient Object[] elementData;

					- transient：瞬间的、短暂的

						- 表示该属性不会被序列化

			- 基本等同于Vector，但线程不安全

		- List list = new ArrayList();

			- 无参构造器

				- 初始容量为0，第一次添加扩容为10，再次扩容，则扩为1.5倍

			- 指定大小构造器

				- 初始为指定大小，再次扩容则扩为1.5倍

		- jdk1.2出现

	- Vector

		- 底层

			- 多线程使用
			- 由数组实现

				- protected Object[] elementData

			- Vector v = new Vectro();

				- 无参构造器

					- 初始容量为10，再次扩容，则扩为2倍

				- 指定大小构造器

					- 初始为指定大小，再次扩容则扩为2倍

		- jdk1.0出现

	- LinkedList

		- 底层

			- 实现了双向链表和双端队列的特点

				- 添加、删除数据不是通过数组实现，效率高
				- 节点

					- first首节点
					- last尾结点
					- 每个节点维护了三个属性

						- prev

							- 指向前一个节点

						- item
						- next

							- 指向后一个节点

			- 线程不安全
			- 底层维护了双向链表

		- CRUD(CREAE READ UPDATE DELETE)

			- .add()
			- remove()

				- .remove()

					- 删除第一个节点

				- .remove(int index)
				- .remove(Object obj)f

			- .set(int index, Object obj)

				- 将index位置的元素改为obj

			- .get(int index)

				- 获得index处对象

			- .size()

				- 获得大小

		- 与ArrayList对比

			- 增删效率

				- LinkedList

					- 较高，链表追加

				- ArrayList

					- 较低，数组扩容

			- 改查效率

				- LinkedList

					- 较低

				- ArrayList

					- 较高

			- 选择

				- 一般程序80%~90%都是查询，用ArrayList
				- 可以分模块选择

	- 方法

		- .add(int index, Object obj)

			- 在index位置插入obj

		- .addAll(int index, list2)

			- 插入多个元素

		- .get(int index)

			- 获取第index个元素

		- .indexOf(Object obj)

			- 首次出现obj的索引

		- .lastIndexOf(Object obj)

			- 最后一次出现obj的索引

		- .remove(int index)

			- 删除index位置元素

		- .set(int index, Object obj)

			- 将index位置元素换为obj

		- .subList(int start, int end)

			- 返回[start, end)的子集和

- Set

	- 底层

		- **不是有序的**
		- 虽然无序，但是固定
			
			- 取决于hash后，再确定索引的结果
			
	- **不允许重复**
		- 判断
		
			- hash值和equals同时使用

	- HashSet

		- 底层

			- HashMap

				- 数组+链表+红黑树

					- 链表到达一定量，并且满足数组的大小，就会把链表树化，变成红黑树

						- 
						- java8中，如果一条链表的元素到达TREEIFY_THRESHOLE（默认是8），并且table的大小>=MIN_TREEEIFY_CAPACITY（默认64）就会进行树化
	
					- 目的：提高效率
					- 添加元素
	
						- 先得到hash值，转换成索引值

							- 找到存储表table。看这个索引是否已经存放元素

								- 没有直接加入，有则调用equals比较，如果相同放弃添加，如果不同添加到最后

						- 第一次添加，table数组扩容到16，临界值（threshold）是16*加载因子（loadFactor）是0.75=12

							- 结点数到了临界值12，就会扩容到16*2 =32，新的临界值就是32*0.75=24

								- java8中，如果一条链表的元素到达TREEIFY_THRESHOLE（默认是8），并且table的大小>=MIN_TREEEIFY_CAPACITY（默认64）就会进行树化，否则仍然采用数组扩容机制（扩大table）

		- 子类

			- LinkedHashSet

				- 底层

					- LinkedHashMap
					- 数组+双向链表
					- 根据元素的hashCode值来决定元素的存储位置，同时使用链表维护元素的次序，这使得元素看起来是以插入顺序保存的
					- 添加元素
	
						- 先求hash值，求索引，确定元素在hashtable中的位置，该位置没元素则添加，有元素则调用equals比较

							- after和before指向后前元素

						- 第一次添加元素直接将table扩容到16，存放的节点类型是LinkedHashMap$Entry

							- 数组是HashMap$Node[]，为Entry父类

	- TreeSet

		- 用无参构造器创建为无序
		- 传入比较器（匿名内部类）
	
			- TreeSet ts = new TreeSet(new Comparator() {
	  	public int compare(Object o1, Object o2){
	          return (String)o1.compareTo((String)o2)
    	}
  		});
  
				- compare return0时不添加

		- 去重机制

			- 用Comparator匿名对象的compare去重，如果返回零则认为是相同元素
			- 没有传入Comparator则将添加元素转为Compareable接口（如果没实现该接口则会报错），利用compareTo比较
	
- 遍历

	- Iterator迭代器

		- Collection coll = new ArrayList();
		Iterator itor = coll.iterator();

			- while(itor.hasNext(){
    		Object o = itor.next();
    		sout(o);
			}

				- 快捷键：itit

					- 显示所有快捷键：ctrl+j

				- 要再次遍历，则需要重置迭代器

	- 增强for循环

		- 底层仍是迭代器

			- for(Object o : coll){
    		sout(o);
			}

				- 快捷键：I

	- for循环

		- for(int i = 0; i<coll.size(); i++){
    	sout(list.get(i));
			}

			- Set不可用

### Map

- jdk8

	- Map用于保存具有映射关系的数据：key-value

		- 双列元素

	- key和value可以使任何引用类型的数据，会封装到HashMap$Node对象中
	- **key不允许重复，当有相同的key时，用新出现的替换旧的**
		- value可以重复
		
	- **key和value可以为null，key只能有一个null，value可以有多个null**
	- 常用String类作为key
	- 通过key总能找到对应的value（单向一对一关系）
	- 为了方便遍历，还会创建Set entrySet集合，该集合存放元素类型是Entry，而一个Entry对象就有key、value
	
		- 因为Map.Entry提供了getKey()和getValue()
	
			- 
	
	- static class Node<K,V> implements Map.Entry<K,V>
	
		- Map.Entry对象的运行类型是Node
	
- 方法

	- Map m = new HashMap()

		- m.put("no1", "lby")

			- 添加元素

		- m.get("no1")

			- 获取key“no1"的元素

		- m.remove("no1")

			- 根据键删除映射关系

		- m.get("no1")

			- 根据键获取值

		- m.size()

			- 获取元素个数

		- m.isEmpty()

			- 判断是否为空

		- m.clear()

			- 清空

		- m.containsKey("no1")

			- 查找是否存在

		- m.keySet()

			- 获取所有的键

		- m.entrySet()

			- 获取所有关系（k-v）

		- m.values()

			- 获取所有值

- 遍历

	- 1.先取出所有key，再通过key取出对应value

		- Set keyset = m.keySet();

			- 增强for

				- for(Object key:keyset){
    sout(key +"-"+  m.get(key));
}

			- 迭代器

				- Iterator iterator = keyset.iterator();
while(iterator.hasNext()) {
    Object key = iterator.next();
    sout(key + "-" + m.get(key));
}

	- 2.把所有values取出

		- Collection values = m.values();

			- 增强for

				- for(Object value:values){
    sout(value);
}

			- 迭代器

				- Iterator iterator = values.iterator();
while(iterator.hasNext()) {
    Object value = iterator.next();
    sout(value);
}

	- 3.通过entrySet来获取k-v

		- Set entrySet = m.entrySet();

			- 增强for

				- for(Object entry:entrySet){
    Map.Entry m = (Map.Entry) entry;
    sout(m.getKey() + "-" + m.getValue());
}

			- 迭代器

				- Iterator iterator = entrySet.iterator();
while(iterator.hasNext()) {
    Object entry = iterator.next();
    Map.Entry m = (Map.Entry) entry;
    sout(m.getKey() + "-" + m.getValue());
}

- HashMap

	- 底层

		- Map接口使用频率最高的实现类
		- 不保证映射的顺序

			- 因为底层以hash表存储

		- 线程不安全
		- 数组+链表+红黑树
		- 扩容机制和HashSet一模一样

- Hashtable

	- 底层

		- 键和值都不能为null，否则抛出NullPointerException
		- 线程安全
		- 数组Hashtable$Entry[],初始化大小为11

			- 临界值=11*0.75

		- 扩容：乘二加一

	- 子类

		- properties

			- 通常作为配置文件

- TreeMap

	- 默认构造器仍然无序
	- TreeMap tm = new TreeMap(new Comparator(Object o1, Object o2){
    public int compare(){
        return (String)o1.compareTo((String)o2);
    }
	  });

		- compare 返回0时不加入

	- 第一次添加，把K-V封装到Entry对象，放入root

### 选择

- 一组对象（单列）

	- Collection

		- 允许重复

			- List

				- 增删多

					- LinkedList

				- 改查多

					- ArrayList

		- 不允许重复

			- Set

				- 插入和取出顺序一致

					- LinkedHashSet

				- 无序

					- HashSet

				- 排序

					- TreeSet

- 一组键值对（双列）

	- Map

		- 键无序

			- HashMap

		- 键排序

			- TreeMap

		- 键插入顺序与取出顺序一致

			- LinkedHashMap

		- 读取文件

			- Properties

### 工具类Collections

- 方法

	- Collections.reverse(list)

		- 反转

	- Collections.shuffle(list)

		- 随机排序

	- Collections.sort(list)

		- 自然排序
		- 自定义排序

			- Collections.sort(list, new Comparator(){
    public int compare(Object o1, Object o2){
        return (String)o1.length() - (String)o2.length();
    }
	});

	- Collections.swap(list, i1, i2)

		- 将索引为i1处元素和索引为i2处元素交换

	- Collections.max(list)

		- 根据自然排序，返回最大值
		- Collections.max(list, new Comparator() {
    	public int compare(Object o1, Object o2){    
        return ((String)o1).length() - ((String)o2).length();
    	}
		});

			- 返回长度最大元素

	- Collections.min(list)

		- 同max

	- Collections.frequency(list, "tom")

		- 返回tom在list中出现的次数

	- Collections.copy(list1, list2)

		- 将list2中的元素拷贝到list1中

			- 为了完成拷贝，要先往list中加入个数与list2相同的元素

				- for(int i; i<list2.size(); i++){
    list1.add("");
	}

	- Collections.replaceAll(list, "tom", "汤姆");

		- 如果list中有tom则替换成汤姆

## 泛型（generic）

### 传统方法缺点

- 不能对加入到集合ArrayList的元素数据类型进行约束（不安全）
- 遍历时需要进行类型转换，影响效率
- 会有编译警告

### 意义

- 可以表示数据类型的数据类型

	- E =

		- Integer
		- String
		- Dog

- jdk5出现解决数据类型安全问题
- 可以在类声明时通过一个表示表示类中某个属性的类型

	- class Person<E>{
    E s;
		}

		- 该数据类型在定义对象时指定

### 使用

- 声明

	- Interface 接口<T>{}
	- class 类 <K,V>{}
	- 可指定多个泛型
	- 只能是引用类型，不能是基本数据类型
	- 简写（推荐）

		- ArrayList<A> a = new ArrayList<>();

	- 默认Object

		- ArrayList a = new ArrayList()

			- 等价ArrayList<Object> a = new ArrayList()

- 添加元素

	- ArrayList<A> a = new ArrayList<A>();

		- 可以添加A和A的子类

- 自定义泛型

	- 类

		- class Tiger<T,R,M>{
    	String name;
    	R r;
    	M m;
    	T t;
		}

			- Tiger成为自定义泛型类
			- T,R,M是泛型标识符，一般是大写字母
			- 使用泛型的数组不能初始化

				- 不能T[] ts = new T[8];

					- 因为无法确定T的类型就无法在内存开空间

			- 静态方法和静态属性不能用泛型

				- 因为静态是和类相关的，在类加载时，对象还没有创建

	- 接口

		- interface IUsb<U, R>{
    int n = 10;
    U name;//错误，因为是静态属性

    public U f1(){}
    public R f2(){}
		}

			- 在继承接口时指定泛型的类型
			
				- interface IA entends IUsb<String, Double>{
		}

					- class A implements IA{
    //要实现IUsb中的抽象方法
    public String f1(){}
    public Double f2(){}
		}

			- 在实现接口时指定泛型类型
			
				- class B implements IUsb<Integer, Float>{

}

	- 方法 
	
		- 可以定义在普通类也可以定义在泛型类
		- 定义
	
			- class Fish<T, R>{
	public <U,M> void f1(U u, M m){}//泛型方法
	public void f2(T t){}//不是泛型方法，但是使用了泛型
	
		- 调用时编译器判断类型

- 继承和通配符

	- 继承

		- Object o = new String("xx");

			- 正确

		- List<Object> list = new ArrayList<String>()

			- 错误

	- 通配符

		- <?>

			- 支持任意泛型

		- <?extends A>

			- 支持A和其子类

		- <?super A>

			- 支持A和其父类，不限于直接父类

### JUnit

- Java的单元测试框架
- 使用

	- 在方法前写@Test再alt+enter选JUnit5.4

		- 可以直接运行方法

## 坦克大战

### java绘图体系

- 左上角为原点，以像素为单位

	- 

- 画图

	- class MyPanel extends JPanel{    //Mypanedl画板
    public void paint(Graphics g){    //g画笔
        super.paint(g);调用父类方法完成初始化
        g.drawOval(10,10,100,100)    //左上角x左上角y，长、宽
	  }

		- paint方法被调用

			- 第一次显示
			- 窗口最小化再最大化
			- 窗口大小发生变化
			- repaint方法被调用

	- public class DrawCircle entends JFrame{    //JFrame对应窗口,可以理解为一个画框
    private MyPanel mp = null;    //定义一个面板
    public static void main(String[] args){
        new DrawCircle();
	  }
    public DrawCircle(){    //构造器
        mp = new MyPanel();    //初始化面板
        this.add(mp);    //把面板放入到窗口（画框）
        this.setSize(400,300);    //定义窗口大小
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);    //点击窗口小叉时退出程序
        this.setVisible(true);//可以显示
    }
	- 方法

		- 直线

			- drawLine(int x1, inty1, int x2, int y2)

		- 矩形边框

			- drawRect(int x, int y, int width, int height)

				- x,y为左上角

		- 椭圆边框

			- drawOval(int x, int y, int width, int height)

		- 填充矩形

			- fillRect(int x, int y, int width, int height)

		- 填充椭圆

			- fillOval(int x, int y, int width, int height)

		- 画图片

			- drawImage(Image img, int x, int y, int width, int heigth)     
			//width和height要根据图片数据

				- 或取图片

					- Image image = Toolkit.getDefaultToolkit().getImage(Panel.class.getResource("/url"))

		- 画字符串

			- drawString(String str, int x, int y)

				- x,y为左下角坐标

		- 设置画笔颜色

			- setColor(Color c)

		- 设置画笔字体

			- setFont(Font font)

				- new Font("隶书",  Font.BOLD, 50)

### java事件处理机制

- class MyPanel enxtends JPanel implements KeyListener{    //alt+enter
    public void keyTyped(KeyEvent e){    //有字符输出触发
    
    }
    public void keyPressed(KeyEvent e){    //键盘按下触发
        sout((char)e.getKeyCode());
        this.repaint();
    }
    public void keyReleased(KeyEvent e){    //键盘释放触发
    
    } 
- public DrawCircle(){
    this.addKeyLinstener(mp);//将键盘监听器加入画框
    }
- code值

	- KeyEvent.VK_DOWN

		- 下箭头

- 
- 在JFrame中

	- this.addWindowListener(new WindowAdapter(){
    public void windowClosing(WindowEvent e){
        sout("关闭");
    }
  }

### 多线程基础

- 概念

	- 进程：运行的程序
	- 线程：进程创建的，是进程的一个实体

		- 单线程

			- 同一时刻只允许执行一个线程

		- 多线程

			- 同一时刻可以执行多个线程

		- 并发

			- 同一时刻多任务交替执行，形成”貌似同时“的错觉，单核cpu实现多任务就是并发

		- 并行

			- 同一时刻多个任务同时执行，多核cpu可实现
			- 获取cpu数量

				- Runtime runtime = Runtime.getRuntime();
int cpuNums = runtime.availableProcessors();

	- 分类

		- 用户线程

			- 工作线程

		- 守护线程

			- 一般是为工作线程服务的，当所有的用户线程结束，守护线程自动结束

				- 常见：垃圾回收机制

					- thread.setDaemon(true)
thread.start();

	- 生命周期（状态）

		- NEW
		- Runnable

			- Ready
			- Running

		- TimedWaiting
		- Waiting
		- Blocked
		- Terminated
		- 

- 创建线程

	- 继承Thread类，重写run方法

		- class Cat extends Thread{
    	public void run(){
	}

			- main:
		Cat cat = new Cat();
		cat.start();

				- main线程启动子线程（运行start）时，程序不会阻塞，会继续执行

	- 实现Runnable接口，重写run方法   （在已经继承其他类时）

		- class Dod implements Runnable{
    public void run(){

    }
}

			- main:
Dog dog = new Dog();
Thread thread = new Thread(dog);
thread.start();

				- 底层是代理模式（proxy）
	
					- class ThreadProxy implements Runnable{
    private Runnable target = null;
    public void run(){
        if(target != null){
            target.run();
        }
    }
    public ThreadProxy(Runnable target){
        this.target = target;
    }
    public void start(){
        start0();
    }
    public void start0(){
        run();
    }
}

- 线程终止

	- 线程任务完成自动退出
	- 使用变量来控制run方法退出（通知方式）

		- main:
thread1.setLoop(false);

- 方法

	- 休眠

		- Thread.sleep(xms);

			- 要ctrl+alt+t选try——catch

	- 线程名

		- Thread.currentThread().getNmae()

	- 监控线程

		- 在控制台输入jconsole

	- 设置线程名

		- setName

	- 更改优先级

		- setPriority

	- 获取优先级

		- getPriority

			- MIN_PRIORITY
			- NORM_PRIORITY
			- MAX_PRIORITY

	- 中断线程

		- interrupt

			- 一般用于中断正在休眠的线程

	- 礼让

		- yield

			- 让出cpu让其他线程执行，但礼让的时间不确定，所以也不一定礼让成功，cpu照顾地过来就会礼让失败

				- t1：
    Thread.yield()

	- 插队

		- join

			- 插队的线程一旦插队成功，则肯定先执行插入的线程所有的任务

				- t1:
    t2.start();
    t2.join();
t1让t2插队

	- 获取状态

		- getState

- 源码

	- start()

		- public synchronized void start(){
    	start0();
		}

			- //start0是本地方法，由JVM调用，底层是C/C++
			private native void start0(){}

				- 运行start0后线程不一定会马上执行，只是将线程变成可执行状态，具体执行时间由cpu调度

- Synchronized

	- 线程同步机制

		- 在多线程编程，一些敏感数据不允许被多个线程同时访问，同步访问技术保证数据在任何同一时刻，最多有一个线程访问
		- 互斥锁

			- 原理

				- 对象有一把锁，线程去抢锁，用完之后还给对象，线程可能连续抢到锁（非公平锁），公平锁不会

					- 要求多个线程的锁对象为同一个

			- 局限性

				- 执行效率降低

			- 非静态的同步方法的锁可以是this也可以是其他对象（要求是同一对象）

				- Obeject obj = new Object();

synchronized(obj){}

			- 静态的同步方法的锁为当前类本身(.class)
	
				- public static void m1(){
	synchronized(类名.class){
	    
	}
}

		- 死锁
	
			- 多个线程都占用了对方的锁资源，但不肯相让，编程中一定要避免
	
				- if(flag){
	synchronized (o1){
	    synchronized(o2){
	    }
	}
}
else{
    synchronized(o2){
        synchronized(o1){
        }
    }
}

		- 释放锁
	
			- 释放
	
				- 执行结束
				- 遇到break、return
				- 出现Error或Exception
				- 执行了wait()
	
			- 不释放
	
				- sleep
				- yield
				- 执行时，其他线程调用该线程的suspend方法将该方法挂起
	
					- 尽量避免使用suspend和resume来控制线程
	
	- 同步代码块
	
		- synchroniezd (对象){//得到对象的锁，才能操作同步代码
	//需要被同步的代码
}

			- synchroniezd (this){}
	
	- 同步方法
	
		- public synchronized void m (){
	//需要被同步的代码
}

## IO流

### 文件

- 保存数据的地方
- 在程序中以流的形式来操作

	- 

### 分类

- 按操作数据单位不同

	- 字节流

		- 8bit

	- 字符流

		- 看字符类型

- 按方向

	- 输入流

		- 文件->程序

	- 输出流

- 按角色

	- 节点流
	- 处理流
	- 包装流

- 

	- 都是抽象类，使用要创建其子类

		- 其子类都是以其父类名为后缀

### 方法

- 创建

	- new File(String pathname)

		- String path = "e:\\news1.txt";
File file = new File(path);//创建java对象
try{
    file.createNewFile();//在磁盘创建文件
}
catch(IOException e){
    e.printStackTrace();
}

	- new File(File parent,String chile)

		- 父目录文件+子路径

			- File parentFile = new File("e:\\");
String fileName = "news2.txt";
File file = new file(parentFile, fileName);
try{
    file.createNewFile();
}
catch(IOException e){
    e.printStackTrace();
}

	- new File(String parent, String child)

		- 父目录+子路径

- 获取文件信息

	-  file.getName()

		- 获取名字

	- file.getAbsolutePath()

		- 绝对路径

	- file.getParent()

		- 父级目录

	- file.length()

		- 文件大小，以字节为单位

	- file.exists()

		- 是否存在

	- file.isFile()

		- 是否是文件

	- file.isDirectory()

		- 是否是目录

- 目录

	- 创建一级目录

		- file.mkdir()

	- 创建多级目录

		- mkdies()

	- 删除空目录或文件

		- delete()

### 字节流、字符流

- 字节流

	- InputStream

		- 常用子类

			- FileInputStream文件输入流

				- 方法

					- FileInputStream fis = new FileInputStream(filePath)

						- .read()

							- .read()

								- int readData = 0;
		try{
    		while( (readData = fis.read()) != -1){
        	sout( (char)readData);
    		}
		catch (IOException e){
    		e.printStackTrace()'
		}
		finally{
    		fis.close();//也要try-catch
		}

									- 读一个字节的数据，到达文件末尾返回-1
									- 一个汉字为三个字节，一个字母为一个字节

							- .read(byte[] )

								- int readLEN = 0;
	byte[] buf = new byte[8];//一次读八个字节
	while( (readLen = fis.read(buf)) != -1){//返回-1表示读取完毕，读取正常返回实际读取的字节数
    	sout(new String(buf, 0, readLen);
	}

			- BufferedInputStream缓冲字节输入流
			- ObjectInputStream对象字节输入流

	- OutputStream

		- 常用子类

			- FileOutputStream

				- 将数据写到文件中，若该文件不存在，则创建该文件

					- FileOutputStream fos = null;
			String filePath = "e:\\a.txt";
			try{
    			fos = new FileOutputStream(filePath);//会覆盖写
    			fos2 = new FileOutputStream(filePath, true);//追加写
			}
			catch(IOException e){
    			e.printStackTrace();
			}
			finally{
    			try{
        		fos.close();
    			}
    			catch(IOException e){
        		e.printStackTrace();
    			}
			}  

						- fos.write('a')

							- 写入一个字节，char->int

						- String str = "hello"
				fos.write(str.getBytes())//字符串转为字节数

							- 写入一个字符串

								- fos.write(str.getBytes(), 0, str.length())//指定写入长度

		- 拷贝

			- 读取部分文件内容输出到目的文件，循环

				- String filePath = "e:\\a.jpg";
String destPath = "c:\\b.jpg";
FileInputStream fis = null;
FileOutputStream fos = null;
try{
    fis = new FileInputStream(filePath);
    fos = new FileOutputStream(destPath);
    //定义一个字节数组,提高读取效率
    byte[] buf = new byte[1024];
    int readLen = 0;
    while( (readLen = fis.read(buf)) != -1){
        //边读边写
        fos.write(buf, 0, readLen);//防止读入空白
}
catch (IOException e){
    e.printStackTrace();
}
finally{
    fis.close();
    fos.close();
}

- 字符流

	- Reader

		- FileReader(直接父类InputStreamWriter)

			- 方法

				- new FileReader(File/String)
				- read

					- 每次读取单个字符，返回该字符，读到末尾返回-1

				- read(char[])

					- 批量读取多个字符到数组，返回独到的字符数，到文件末尾返回-1
					- 相关api

						- new String(char[])
						- new String(char[], off, len)

	- Writer

		- FileWriter(直接父类OutputStreamWriter

			- 方法

				- new FileWriter(File/String)

					- 覆盖模式，相当于流的指针在首端

				- new FileWriter(File/String, true)

					- 追加模式，相当于流的指针在末尾

				- write(int)
				- write(char[])
				- write(char[], off, len)
				- write(String)
				- write(String, off, len)
				- 相关api

					- toCharArray

						- 将String转换成char[]

			- 使用后必须close或flush（刷新）否则写不进去

	- 处理二进制文件可能出现文本损失

### 节点流、处理流

- 节点流

	- 从特定数据源读写数据

		- 如FileReader、FileWriter

			- ByteArrayInputStream、ByteArrayOutputStream

	- 底层流，直接与数据源相接

- 处理流/包装流

	- 对节点流进行包装，为程序提供更为强大的读写功能，也更加灵活。

		- BufferedReader

			- 有属性Reader，即可以封装一个节点流，该节点流只要是Reader子类即可

				- throws Exception
	String filePath = "e:\\a.java";
	BufferedReader br = new BufferedReader(new FileReader(filePath));//在节点流加true改为追加写
	String line;//按行读取,效率高
	while( (line = bufferedReader.readLine()) != null){//readLine读到末尾返回null
    	sout(line);
	} 
	br.close();
				- 以字符为单位，不要处理二进制数据（声音、视频、doc）

		- BufferedWriter

			- 有属性Writer  

				- 插入与系统相关的换行符

					- bw.newLine();

		- BufferedInputStream

			- 复制粘贴

				- throws IOException
orinPath = "e.xx.jpg";
destPath = "d.xx.jpg";
BufferedInputStream bi = new BufferedInputStream(new FileInputStream(orinPath);
BufferedOutputStream bo = new BufferedOutputStream(new FileOutputStream(destPath);

byte[] buff = new byte[1024];
int readLen = 0;
while( (readLen = bi.read(buff))!=-1){
    bo.write(buff,0,readLen);
}
bi.close();
bo.close();

		- BufferedOutputStream
	
	- 修饰器模式，不直接与数据源相连
	- 消除不同节点流的实现差异
	- 关闭时，只需要关闭外部流即可,底层会自动关闭节点流
	- 对象流
	
		- 保存数据值的同时保存数据类型
	
			- 序列化
	
				- 必须实现Serializable（标记接口，没有方法）或Externalizable接口 （有方法需实现，一般不用）  
	
					- 序列化后保存的文件格式不是纯文本，而是他的格式
					- 序列化的类中建议添加SerialVersionUID，为了提高版本的兼容性
					- 序列化对象时默认将所有的属性进行序列化，但static或transient修饰的成员除外
					- 序列化对象时，要求类中所有属性都要实现序列化接口
					- 序列化对象具有继承性，父类实现则子类实现
	
		- 反序列化
	
			- 在恢复数据时，恢复数据的值和数据类型
	
		- ObjectOutputStream
	
			- ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));
oos.writeInt(100);//int->Integer
oos.writeBoolean(true);//boolean -> Boolean
oos.writeChar('a');//char -> Character
oos.writeDouble(9.5);//double -> Double
oos.writeUTF("字符串“);//String
oos.writeObject(new Dog("大黄:，9));//class Dog Implements Serializable
oos.close();

		- ObjectInputStream
	
			- 读取顺序要与保存顺序一致
			- ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath));
sout(ois.readInt());
sout(ois.readBoolean());
sout(ois.readChar());
sout(ois.readDouble());
sout(ois.readUTF());
sout(ois.readObject());//底层 Object ->Dog,编译类型Object，运行类型Dog
ois.close();

### 标准输入输出流

- System.in

	- 编译类型

		- InputStream

	- 运行类型

		- BufferedInputStream

			- System.in.getClass()

	- 默认设备

		- 键盘

- System.out

	- 编译类型

		- PrintStream

	- 运行类型

		- PrintStream

	- 默认设备

		- 显示器

### 转换流

- 如字节流->字符流

	- 默认情况下读取文件是按照utf-8编码
	- 处理纯文本数据时，使用字符流效率更高，并且可以有效解决中文问题
	- InputStreamReader

		- Reader的子类，实现将InputStream（字节流）包装成Reader（字符流）

			- InputStreamReader isr = new InputStreamReader(new FileInputStream(filePath), "gbk");
BufferedReader br = new BufferedReader(isr);
String s = br.readLine();
br.close();

	- OutputStreamWriter

		- 实现将OutputStream(字节流）包装为Writer（字符流）

			- OutputStreamWriter osw = newOutputStreamWriter(new FileOutputStream(filePath), "utf8");
osw.write("写入内容");
ows.close();

### 打印流

- 只有输出流没有输入流

	- PrintStream

		- 字节流

			- PrintStream ps = System.out;
ps.print("输出内容");
ps.close();

				- 修改打印位置

					- System.setOut(new PrintStream("e:\\a.txt"));
System.out.println("输出内容");

	- PrintWriter

		- 字符流

			- PrintWriter pw = new PrintWriter(new FileWriter("e:\\a.txt");
pr.print("输出内容");
pr.close();

### 配置文件.properties

- 专门用于读写配置文件的集合类
- 格式：
键=值
键=值

	- 键值对不需要有空格，值不需要用引号，默认是String

- 常见方法

	- load

		- 加载配置文件的键值对到Properties对象

			- Properties p = new Properties();
	p.load(new FileReader(filePath));

	- list

		- 将数据显示到指定设备

			- p.list(System.out);

	- getProperty(key)

		- 根据键获取值

			- String s = p.get("user");

	- setProperty(key, value)

		- 设置（存在就修改，不存在就创建） 键值对到Properties对象

			- p.setProperty("charset", "utf8");
	p.setProperty("user", "汤姆");
	p.setProperty("pwd", "123123");
	p.store(new FileOutputStream(filaPath), null);//null位置为注释

	- store

		- 将Properties中的键值对存储到配置文件，在idea中，如果有中文，会存储为unicode码

## 网络编程

### 网络通信

- 概念

	- 两台设备之间通过网络实现数据传输

- 网络

	- 局域网

		- 一个机房

	- 城域网

		- 覆盖一个城市

	- 广域网

		- 覆盖全球甚至全国

			- 万维网是代表

- ip地址

	- 概念

		- 用于唯一标识网络中的每台计算机

	- cmd用ipconfig可查看ip地址
	- ipv4

		- 4个字节（32位）

			- 一个字节的范围0~255

				- 192.168.16.69

					- 网络地址+主机地址

						- 
						- 

	- ipv6

		- 作用

			- 解决网络地址资源数量问题
			- 解决多种设备连入互联网的问题

		- 128位，16个字节

			- 冒号分割，十六进制

- 域名

	- 将ip地址映射成域名，www.baidu.com

		- 好记
		- 映射方法http协议

- 端口号

	- 用于标识计算机上某个特定网络程序
	- 0~65535(0~2^16-1)两个字节

		- 0~1024已经被知名程序占用，在网络开发中不要使用

	- 常见端口号

		- tomcat

			- 8080

		- mysql

			- 3306

		- oracle

			- 1521

		- sqlserver

			- 1433

- 网络通信协议

	- 例子

		- 语言：中文、英文......
		- TCP/IP协议

			- 传输控制协议/因特网互联协议

				- TCP（传输控制协议）

					- 三次握手，可靠
					- 可传输大量数据
					- 传输完后要释放已建立的链接，效率低
					- 短电话
					- 当客户端连接到服务端后，客户端也是通过一个端口和服务端进行通讯的，这个端口是TCP/IP来分配的，是不确定的

				- UDP（用户数据协议）

					- 将数据、源、目的封装成数据包，每个包64KB以内，不需要建立连接
					- 不适合传输大量数据
					- 因无需链接，不可靠
					- 速度快
					- 短信

	- 在网络编程中，数据的组织形式就是协议

- java.net

### InetAdress类

- 方法

	- 获取本机InetAdress对象

		- getLocalHost

			- InetAddress localHost = InetAddress.getLocalHost();
System.out.println(localHost);

	- 根据指定主机名/域名获取ip地址对象

		- getByName

			- InetAddress host1 = InetAddress.getByName("lby‘s");
System.out.println(host1);

InetAddress host2 = InetAddress.getByName("www.baidu.com");
System.out.println(host2);

	- 获取InetAdress对象的主机名/域名
	
		- getHostName
	
			- String hostName = host2.getHostName();
sout(hostName);

	- 获取InetAdress对象的地址
	
		- getHostAdress
	
			- String hostAdress = host2.getHostAddress();
System.out.println(hostName);

### Socket（套接字、插头）

- TCP

	- 开发网络应用程序被广泛采用，以至于成为事实上的标准
	- 通信的两端都要有Socket，是两台机器通信的端点
	- 网络通信其实就是Socket通信
	- Socket允许程序把网络连接当成一个流，数据在两个Socket间通过IO传输
	- 一般主动发起通信的叫客户端，接受请求连接（监听）的叫服务器端
	- 例子

		- //服务端在9999端口监听，等待连接,ServerSocket可有多个
ServerSocket serverSocket = new ServerSocket(9999);
//有客户端连接则返回Socket对象，程序再继续
Socket socket = serverSocket,accept();
InputStream ips= socket.getInputStream;
byte[] buf = new byte[1024];
int readLen = 0;
while((readLen = ips.read(buf)) != -1){
    sout(new String(buf, 0, readLen));
}
OutputStream ops = socket.getOutputStream();
ops.write("hello,client".getBytes());
socket.shutdownOutput();//结束标记
ops.close();
ips.close();
socket.close();
serverSocket.close();
		- //连接这台主机的9999端口，连接成功返回socket
Socket socket = new Socket(InetAdress.getLocalHost(), 9999);
OutputStream ots = socket.getOutputStream();
ots.write("hello,server".getBytes());
socket.shutdownOutput();//结束标记
ots.close();
socket.close();

- UDP

	- 没有服务端和客户端，只有接收端和发送端
	- 例子

		- public class Receiver_ {
    public static void main(String[] args) throws IOException {
        //创建DatagramSocket对象在9999端口监听
        DatagramSocket socket = new DatagramSocket(9999);
        System.out.println("A端在9999等待接收数据");

        //构造一个DatagramPacket对象，准备接收数据
        //一个数据包最大64KB
        byte[] buf = new byte[64 * 1024];
        DatagramPacket packet = new DatagramPacket(buf, buf.length);
        //调用接受方法，没有数据发送到9999则阻塞
        socket.receive(packet);

        //packet拆包
        int length = packet.getLength();//实际接收到的数据字节长度
        byte[] data = packet.getData();//接收到数据
        String s = new String(data, 0, length);
        System.out.println(s);

        //关闭资源
        socket.close();
        System.out.println("A端退出");
    }
}
		- public class Sender_ {
    public static void main(String[] args) throws IOException {
        //创建DatagramSocket对象在9998端口监听,不同机器可以端口号相同
        DatagramSocket socket = new DatagramSocket(9998);
        //将需要发送的数据封装到DatagramPacket对象
        byte[] data = "hello,明天吃火锅".getBytes();
        DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName("169.254.28.161"), 9999);
        socket.send(packet);
        socket.close();
        System.out.println("B端退出");
    }
}

### netstat指令

- netstat -an

	- 查看当前主机网络情况，包括端口监听情况和网络连接情况
	- netstat -an | more

		- 分页显示

- netstat -anb

	- 知道是哪个程序在监听

## 项目开发流程简介

### 需求分析

- 需求分析师：懂技术+行业
- 出需求分析报告（白皮书），包含项目功能，客户具体要求

### 设计阶段

- 架构师/项目经理
- 设计工作（UML类图、流程图、模块设计、数据库、架构）
- 原型开发、组建团队

### 实现阶段

- 程序员/码农
- 完成架构师的功能模块
- 测试自己的模块

### 测试阶段

- 测试工程师
- 单元测试、测试用例、白盒测试、黑盒测试、集成测试

### 实施阶段

- 实施工程师

	- 开发能力要求低，环境配置能力要求高，身体要好

- 把项目正确部署到客户的平台，并保证正常运行

### 维护阶段

- 发现bug/项目升级

## 多用户即时通信系统

### 需求分析

- 用户登录

	- 

- 拉取在线用户列表

	- 

- 私聊

	- 

- 群聊

	- 

- 发文件

	- 

- 服务器推送新闻

	- 

### 实现

- 
- ConcurrentHashMap是可以处理并发的集合

## 反射(reflection)

### ocp原则

- 开闭原则

	- 不修改源码，拓展功能

### 加载完类之后，在堆中就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象包含了类的完整结构信息。通过这个对象得到类的结构。这个对象就像一面镜子，透过这个镜子看到类的结构，所以形象地称之为反射

- 
- 优点

	- 可以动态的创建和使用对象（也是框架底层核心），使用灵活

- 缺点

	- 反射基本是解释执行，对执行速度有影响

### 反射相关的主要类

- java.lang.

	- Class

		- 代表一个类

	- reflect.Method

		- 代表类的方法

	- reflect.Field

		- 代表类的成员变量

	- reflect.Constructor

		- 代表类的构造方法

- 例

	- Properties properties = new Properties();
properties.load(new FileInputStream("src\\xx.properties))
String classfullpath = properties.get("classfullpath").toString();
String methodName = properties.get("method").toString();
//加载类，返回Class类型的对象cls
Class cls = Class.forName(classfullpath);
object o = cls.newInstance();
//在反射中，可以把方法视为对象
Method method1 = cls.getMethod(method);
//通过method1调用方法
method.invoke(o);//传统：对象.方法()；反射：方法.invoke(对象)
//getField不能得到私有的属性
Field nameField = cls.getField("age");
sout(nameField.get(o))
//获取无参构造器
Constructor constructor = cls.getConstructor();
//获取带参构造器
Constructor constructor2 = cls.getConstructor(String.class);

### 优化速度

- 关闭访问检查

	- Method hi = cls.getMethod("hi");
hi.setAccessible(true);//false为打开检查

### Class类

- 概念

	- 不是new出来的，是系统创建的
	- 对于某个类的Class在内存中只存有一份，因为类只加载一次
	- 每个对象实例都知道自己是属于哪个Class对象的
	- 通过Class对象可以得到一个类的完整结构
	- Class对象存放在堆区

		- 在方法区有类的二进制数据/元数据

- 常用方法

	- sout(cls)

		- 显示cls是哪个类的Class对象

	- cls.getClass()

		- 输出cls的运行类型

	- cls.getPcakage().getName()

		- 得到包名

	- cls.getName()

		- 得到全类名

	- Car car = (Car)cls.newInstance();

		- 得到对象实例

	- Field brand = cls.getField("brand");
sout(brand.get(car))

		- 获取属性
		- 给属性赋值

			- brand.set(car, "奔驰");

	- Field[] fields = cls.getFields();
	for(Field f: fields){
    sout(f.getName());
	}

		- 获取所有属性

- 获取Class类对象

	- 已知全路径

		- Class cls1 = Class.forName(classAllPath)

	- 已知具体的类

		- Class cls2 = Car.class;

	- 已知某个类的实例

		- Class cls3 = car.getClass();

	- 用类加载器

		- //先得到类加载器
ClassLoader classLoader = car.getClass().getClassLoader();
//通过类加载器得到Class对象
Class cls4 = classLoader.loadClass(classAllPath);

	- 基本数据类型(int,char,boolean,float,double,byte,long,short)

		- Class<Integer> integerClass = int.class;

	- 包装类

		- Class<Integer> type = Integer.TYPE;

- 获取类结构信息

	- Class cls = Class.forName("com.lbytech.reflection.Person");

		- 第一组

			- cls.getName()

				- 得到全类名

			- cls.getSimpleName()

				- 获得简单名

			- Field[] fields = cls.getFields();
	field.for()

				- 获得本类和父类public属性

			- cls.getDeclearedFields()

				- 获取本类所有属性

			- cls.getMethods()

				- 获得本类及父类的public方法

			- cls.getDeclaredMethods()

				- 获得本类所有方法

			- cls.getConstructor()

				- 获得本类的public构造器

			- cls.getDeclaredConstructors()

				- 获得本类所有构造器

			- cls.getPackage()

				- 以Package形式返回，包信息

			- cls.getSuperclass()

				- 以Class形式返回父类信息

			- cls.getInterfaces()

				- 以Class[]形式返回接口信息

			- cls.getAnnotations()

				- 以Annoation[]形式返回注解信息

		- 第二组

			- declaredField/method/constructor.getModifiers()

				- 以int形式返回修饰符

					- 默认是0，public是1，private是2，protected是4，static是8，final是16，多重就相加

			- field.getType()

				- 以Class形式返回属性类型

			- method.getReturnType()

				- 获得方法返回类型

			- method/constructor.getParameterTypes()

				- 输出当前方法形参数组情况

- 创建对象

	- cls.newInstance()

		- 调用无参构造器

	- Constructor c = getConstructor(Class......)
c.newInstance(形参)

		- String.class等

			- 根据形参列表获取对应类的public对象

	- Constructor c = getDecalaredConstructor(Class......);
	c.setAccessible(true);//爆破，让私有构造器可以被调用
	c.newInstance(形参);

		- 根据参数列表获取对应的所有构造器对象

- 获得属性

	- Object o = cls.newInstance();
Field age = cls.getField("age");
age.set(o, 88);
sout(age.get(o))

		- 操作共有属性

	- Field name = cls.getDeclaredField("name");
	name.setAccessible(true);//爆破，可以操作私有属性
	name.set(o,"lby");
	name.set(null,"lby")//操作static属性，因为是所有实例共有
	sout(name.get(o));
	sout(name.get(null));

		- 操作私有属性/静态

- 访问方法

	- Class cls = Class.forName("Boss")
		Object o = cls.newInstance();

		- Method hi = cls.getMethod("hi", String.class);//方法的形参列表
			//或getDeclaredMethod("hi")，可获取私有方法
			//hi.setAccessible(true);

			- hi.invoke(o, 形参列表))//如果是static，o可写null

				- 调用

					- 返回值形式是Object，编译类型为原方法返回类型

### 类加载

- 静态加载

	- 编译时加载相关的类，如果没有则报错依赖性高

		- Dog dog = new Dog()

- 动态加载

	- 运行时加载需要的类，如果运行时不用该类，则不报错，降低了依赖性

		- Class cls = Class.forName("Person")

- 

	- 

		- 连接

			- 验证

				- 

			- 准备

				- 

			- 解析

				- 将常量池内的符号引用替换为直接引用

		- 初始化

			- clinit方法依次自动收集类中所有的静态变量的赋值动作和静态代码块中的语句，并合并

				- 线程安全

					- 保证内存中某个类只有一份

## MYSQL

### 安装

- 删除

	- sc delete mysql

- SQLyog快捷键

	- 注释

		- ctrl+shift+c

	- 取消注释

		- ctrl+shift+r

### 连接

- 启/停

	- net stop mysql
	- net start mysql

- mysql -h 主机名 -P 端口 -u 用户名 -p密码

	- -h和-p不写默认为本机3306

		- 3306太明确容易被攻击，一般会改

	- 用户名root，密码1212.........

- 离开

	- quit

### 三层结构

- MySQL数据库

	- DBMS

		- data base manage system

			- 可管理多个数据库

				- 监听程序

	- 数据库

		- data文件夹

	- 表

		- 普通表本质是文件

			- 行row

				- 一条记录

					- 在java中，一行往往用对象表示

			- 列column

### 操作

- character set

	- 指定数据库采用的字符集，不写默认utf8

- collate

	- 指定数据库字符集校对规则

		- 常用

			- utf8_bin

				- 区分大小写

			- utf8_general_ci

				- 默认
				- 不区分大小写

- 对数据库指令

	- 创建

		- CREATE DATABASE 数据库名

			- CREATE DATABASE 数据库名 CHARACTER SET utf8 COLLATE utf8_bin

				- name带反引号可规避关键字问题

	- 查询

		- SELECT * FROM 表名 WHERE 列名 = ’要找的'

			- *代表全部

		- SHOW CREATE DATABASE db_name

			- 显示数据库创建语句

		- SHOW DATABASES

			- 查看当前数据库服务器中所有的数据库

	- 删除

		- DROP DATABASE db_name

	- 备份

		- 备份数据库

			- DOS执行

				- mysqldump -u 用户名 -p -B 数据库1 数据库2 数据库n > 路径文件名.sql

					- 备份文件就是对应的sql语句

		- 恢复数据库

			- MySQL命令行执行

				- Source 路径文件名.sql

		- 备份表

			- mysqldump -u 用户名 -p 数据库 表1 表2 表n > 路径文件名.sql

				- 不用-B

- 对表

	- 创建

		- CREATE TABLE table_name(
    	field1 datatype,
    	field2 datatype,
    	id TINYINT UNSIGNED
	)CHARACTER SET utf8 COLLATE utf8_bin
	ENGINE INNODB;

			- character set和collate不指定则默认和数据库相同
			- engine
			- 数据类型/列类型

				- 数值类型

					- 整形

						- tinyint

							- 一个字节

						- smallint

							- 两个字节

						- mediumint

							- 三个字节

						- int

							- 四个字节

						- bigint

							- 八个字节

					- 位

						- bit(m)

							- m位，显示按照二进制

					- 小数类型

						- float

							- 单精度，四个字节

						- double

							- 双精度，八个字节

						- decimal[M,D]

							- M小数位数的总数，D小数点后面的位数

								- 大小取决于M、D

									- M最大65
									- D最大30

								- M省略默认是10
								- D省略默认是0
								- 如果D=0,则没有小数部分,用来存整数

				- 文本类型（字符串类型）

					- char(size)

						- 0-255字符,英文和汉字都是

							- 定长：多了插不进，少了也占size

								- 查询速度比varchar快

					- varchar(size) 

						- 0-65535（2^16-1)字节

							- 1-3个字节记录大小，65532个字节存数据，utf8最多存65532/3=21844个字符，gbk为/2

								- 变长，按照实际占用空间来分配，但本身需要占用1-3个字符

					- text

						- 0-2^16-1

					- mediumtext

						- 0-2^24

					- longtext

						- 0-2^32-1

				- 二进制数据类型

					- blob

						- 0-2^16-1

					- longblob

						- 0-2^32-1

				- 日期类型

					- date

						- 年月日

							- birthday DATE

					- time

						- 时分秒

					- datetime

						- 年月日时分秒

							- YYYY-MM-DD HH:mm:ss

								- job_time DATETIME

					- timestamp

						- 时间戳

							- login_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

								- 修改时自动设为当前时间

									- 更新时会改为当前时间

					- 插入

						- INSERT INTO t(birthday, job_time) VALUES('2024-11-11', '2022-11-11 10:10:10');

	- CRUD

		- 插入(INSERT)

			- 语句

				- INSERT INTO 表名 (列名......)
    VALUES(值......)

			- 注意

				- 插入数据应与对应字段类型相同

					- '30'也可看作整形，因为mysql底层会尝试转型

				- 数据的长度应在规定范围内
				- values内列出的数据位置必须与被加入的列的排序位置先对应
				- 字符和日期型数据应包含在单引号中
				- 列可以插入空值，前提是该字段允许为空
				- 可一次添加多条记录

					- INSERT INTO 表名（列名......)
    	VALUES(值......), (值......)......;

				- 如果是给表中所有的字段添加数据，可以不写前面的字段名称

					- INSERT INTO 表名 VALUES(值1, 值2, ......, 值n)

				- 当不给某个字段值时，如果有默认值就会添加默认值，否则报错

					- NOT NULL DEFAULT 默认值

		- 修改(UPDATE)

			- 语句

				- UPDATE employee SET salary = 5000;

					- 没有where条件，会修改所有记录，慎用

				- UPDATE employee SET salary = 3000 WHERE user_name='小妖怪';

					- 指定对象

				- UPDATE employee SET salary = salary+1000 WHERE user_name='老妖怪';

					- 在原来的基础上改变

				- UPDATE employee SET salary = salary+1000，job='出主意' WHERE user_name='老妖怪';

					- 一次修改多项

		- 删除(DELETE)

			- 语句

				- DELETE FROM employee WHERE user_name = '老妖怪

					- 删除指定对象

				- DELETE FROM employee

					- 删除所有对象

				- DROP TABLE 表名

					- 删除表

		- 查询(SELECT)

			- 语句

				- SELECT [DISTINCT] *|(column1,column2,......) FROM table_name

					- DISTINCT去重

						- 查询的每个字段都相同才会去重

				- SELECT `name`, (chinese+english+math) AS total_score FROM student

					- 改名显示

				- SELECT * FROM student WHERE name='赵云'

					- 条件查询

				- SELECT * FROM student WHERE name LIKE '韩%’

					- 模糊搜索

				- SELECT column,column2,... FROM student ORDER BY math DESC/ASC

					- 排序

						- 默认升序(ASC)

				- 合计/统计

					- 语句

						- COUNT

							- SELECT COUNT (*|column） from table_name [WHERE...]

								- COUNT(*)返回满足条件的记录的行数
								- COUNT(列)统计满足条件的某列有多少个，但会排除null

						- SUM

							- SELECT SUM(列名)[,SUM(列名)......] from table_name[WHERE......]

								- 统计一列总和

						- AVG

							- SELECT AVG(math) FROM student

								- 求平均值

						- MAX/MIN

							- SELECT MAX(math) from student

				- 分组

					- SELECT AVG(sal) AS avg_sal, MAX(sal), departmentnumber, job 
    	FROM emp GROUP BY departmentnumber, job  
    	HAVING avg_sal < 2000; --过滤

			- WHERE运算符

				- > < <= >= = !=
				- BETWEEN......AND......

					- 两端闭区间

				- OR
				- IN

					- WHERE math IN(89,90,91)

				- 子主题 5

	- 修改

		- 添加列

			- ALTER TABLE table_name
	ADD(column datatype[DEFALUT expr], ......);

				- NOT NULL DEFAULT '默认为' AFTER 在哪一列后面

		- 修改列

			- ALTER TABLE table_name
MODIFY(column datatype[DEFALUT expr], ......);

		- 删除列

			- ALTER TABLE table_name
DROP (column);

		- 查看表结构

			- DESC 表名；

		- 修改表名

			- Rename table 表名 to 新表名

		- 修改表字符集

			- alter table 表名 character set 字符集

		- 修改列名

			- ALTER TABLE employee CHANGE `name` user_name VARCHAR(32)

	- 函数

		- 字符串相关函数

			- 返回字符集

				- SELECT CHARSET(`name`) FROM emp;

			- 连接字串,将多个列拼接成一列

				- SELECT CONCAT (`name`, 'job is', job) FROM emp; 

			- 返回字符串出现的位置

				- SELECT INSTR('hanshunping', 'ping') FROM DUAL;

					- DUAL是亚元表可做测试表用

			- 转成大写

				- SELECT UCASE(`name') FROM emp

			- 转成小写

				- SELECT LCASE(`name`) FROM emp

			- 从左取字符

				- SELECT LEFT(`name`, 2) FROM emp

					- RIGHT也有
					- 从左取两个

			- 返回长度

				- SELECT LENGTH(`name`) FROM emp;

					- 按照字节返回

			- 替换

				- SELECT `name`, REPLACE(job, 'MANAGER', '经理‘) FROM emp;

			- 逐字比较两字符大小

				- SELECT STRCMP('hsp', 'asp') FROM DUAL

			- 截取

				- SELECT SUBSTRING(`name`, 1,2) FROM emp

					- name列的第一个位置开始取出两个字符

			- 去空格

				- SELECT LTRIM('      123') FROM DUAL;

					- 去左空格

				- RTRIM
				- TRIM

		- 数学相关函数

			- 绝对值

				- SELECT ABS(-10) FROM DUAL

			- 十进制转二进制

				- SELECT BIN(10) FROM DUAL

			- 向上取整

				- SELECT CEILING(1.1) FROM DUAL

					- 比1.1大的最小整数

			- 向下取整

				- SELECT FLOOR(1.1) FROM DUAL

			- 进制转换

				- SELECT CONV(8, 10, 2) FROM DUAL

					- 把8当作十进制，转成二进制

			- 保留小数位数

				- SELECT FORMAT(78.12345, 2) FROM DUAL

					- 四舍五入保留2位小数

			- 求最小值

				- SELECT LEAST(0,1,-10) FROM DUAL

			- 求余

				- SELECT MOD(10,3) FROM DUAL

					- 10模3

			- 返回随机数

				- SELECT RAND() FROM DUAL

					- 返回[0,1]的随机数

				- SELECT RAND(seed) FROM DUAL

					- seed不变时，随机数不变

			- 四舍五入

				- ROUND()

		- 时间日期相关函数

			- 当前日期

				- SELECT CURRENT_DATE FROM DUAL

			- 当前时间

				- SELECT CURRENT_TIME() FROM DUAL

			- 当前时间戳

				- SELECT CURRENT_TIMESTAMP () FROM DUAL

					- 相当于NOW()

			- 返回datetime的日期部分

				- DATE(datetime)

			- 在date2中加上时间或日期

				- DATE_ADD(date2, INTERVAL d_value d_type)

					- SELECT * FROM mes
    	WHERE DATE_ADD(send_time,  INTERVAL 10 MINUTE) >= NOW()
					- d_type

						- YEAR
						- MINUTE
						- SECOND
						- HOUR
						- DAY

			- 在date2减去一个时间或日期

				- DATE_SUB

			- 两日期相差天数

				- DATEDIFF(’2024-11-2', '2003-09-19')

					- 前面减后面

			- 两时间相差多小时，分钟，秒

				- TIMEDFF(time1, time2)

			- 返回年或月或日

				- YEAR(NOW())

			- 1970-1-1到现在的秒数

				- SELECT UNIX_TIMESTAMP() FROM DUAL

			- 把UNIX_TIMESTAMP转成指定格式的日期

				- SELECT FROM_UNIXTIME(1618483484, '%Y-%m-%d %H:%i:%s') FROM DUAL
				- 可用整数表示时间

			- 一个时间所在月的最后一天

				- LAST_DAY(time)

		- 加密和系统函数

			- 查询用户

				- SELECT USER() FROM DUAL

			- 查询当前使用的数据库名称

				- SELECT DATABASE()

			- 为字符串计算出一个MD5 32的字符串

				- 常用于用户密码加密

					- 王小云破解了

				- SELECT MD5(‘密码’) FROM DUAL
				- LENGTH()获取长度
				- csdn数据库被攻，发现全是明文存储

			- 加密函数

				- SELECT PASSWARD('密码') FROM DUAL

					- MySQL数据库的用户和密码就是用这个加密的

						- SELECT * FROM mysql.user

		- 流程控制函数

			- IF(expr1, expr2, expr3)

				- 如果expr1为真，返回expr2，否则返回expr3

					- 判断是否为空：`name` IS NULL
					- 判断不为空：`name` IS NOTNULL

			- IFNULL(expr1, expr2)

				- 如果expr1不为空，则返回expr1，否则返回expr2

			- SELECT CASE WHEN expr1 THEN expr2
    		WHEN expr3 THEN expr4 ELSE expr5
    		END;

				- 如果expr1为真，返回expr2；如果exp1为假，expr3为真，返回expr4；否则返回expr5

					- 类似于多分枝

- 查询加强

	- 直接比较日期

		- SELECT * FROM emp 
    	WHERE hiredate > '2020-10-10'

			- 2020年10月10日以后入职的员工

				- 要注意格式

	- 模糊查询

		- SELECT ename, sal FROM emp
    WHERE ename LIKE 'S%'

			- 首字符为S

				- %为随意任意多个

		- SELECT ename, sal FROM emp
    	WHERE ename LIKE '_O'

			- 第二个字符为O

				- _为随意一个

	- 分页查询

		- SELECT ...... LIMIT  start, rows

			- 从start+1行开始取，取出rows行，start从0开始
			- start和row要先算出来，不能填算式

				- start=每页显示记录数*（第几页-1）
				- row=每页显示记录数

	- 分组顺序

		- GROUP BY column
		- HAVING condition
		- ORDER BY column
		- LIMIT start,rows
		- 写的顺序错了会报错

- 多表查询

	- 默认情况下(笛卡尔集)

		- SELECT * FROM emp, dept

			- 从第一张表中，取出一行和第二张表的每一行进行组合，返回结果含有两张表的所有列。
			- 返回(第一张表的行数*第二张表的行数)行

	- 过滤

		- SELECT * FROM emp,dept
    	WHERE emp.deptno = dept.deptno

			- 多表查询的条件不能少于表的个数-1，否则会出现笛卡尔集

	- 自连接

		- 将同一张表看作两张表

			- 员工和上级在一张表

				- SELECT worker.ename AS '职员名', boss.ename AS'上级名'
    			FROM emp worker, emp boss
    			WHERE worker.mgr = boss.empno

					- worker和boss是别名

- 子查询

	- SELECT * FROM emp
    WHERE deptno = (
        SELECT deptno
        FROM emp
        WHERE ename = 'SMITH'
    )

		- 查询SMITH同部门所有人

	- SELECT ename, job, sal, deptno FROM emp
    WHERE job IN  (
        SELECT DISTINCT job
        FROM emp
        WHERE deptno = 10
    )AND deptno != 10

		- 与10号部门工作相同的人,但不包含十号部门的人

	- 临时表

		- SELECT goods_id, ecs_goods.cat_id, goods_name, shop_price FROM(
    	SELECT cat_id, MAX(shop_price) AS max_price
    	FROM ecs_goods
    	GROUP BY cat_id
	) temp, ecs_goods   --temp为括号内临时表的别名
	WHERE temp.cat_id = ecs_goods.cat_id AND temp.max_price = ecs_goods.shop_price

			- 查询ecshop中各个类别中价格最高的商品

	- all

		- SELECT ename, sal, deptno FROM emp
    	WHERE sal > ALL(
        SELECT sal FROM emp WHERE deptno = 30
    	)

			- 显示工资比部门30的所有员工都高的员工

	- any

		- 把上面的ALL换成ANY

			- 显示工资比部门30其中一个员工高的的员工

	- 多列子查询

		- SELECT * FROM emp
		WHERE (deptno, job) = (
        SELECT deptno, job FROM emp
            WHERE ename = 'SMITH'
        ) AND ename != ' SMITH'

			- 查询与SMITH同岗位且同部门的人

- 表复制/蠕虫复制

	- 有时为了测试某个sql语句效率，需要海量数据

		- INSERT INTO my_tab01
    (id, `name`, sal, job, deptno)
    SELECT empno, ename, sal, job, deptno FROM emp;

			- 将emp复制到my_tab01

		- INSERT INTO my_tab01
    SELECT * FOROM my_tab01;

			- 自我复制

		- 删除重复记录

			- 创建

				- CREATE TABLE my_tab02 LIKE emp;--将emp表的结构复制到新表
			INSERT INTO my_tab02 SELECT * FROM emp;

			- （1）创建临时表my_temp,该表与my_tab02一样
				（2）将my_tab02的记录通过distinct关键字处理后，复制到my_temp
				（3）清除掉my_tab02记录
				（4）把my_temp复制到my_tab02
				（5）drop掉my_temp

				- CREATE TABLE my_temp LIKE my_tab02;

INSERT INTO my_temp SELECT DINSTINCT * FROM my_tab02;

DELETE FROM my_tab02

INSERT INTO my_tab02 SELECT my_temp

DROP TABLE my_temp

- 合并查询

	- UNION ALL

		- SELECT ename,sal,job FROM emp WHERE sal>2500
	UNION ALL
	SELECT ename,sal,job FROM emp WHERE job='MANAGER';

			- 两表合并不去重

	- UNION

		- 两表合并会去重

- 外连接

	- 左外连接

		- 左侧的表完全显示

	- 右外连接

		- 右侧的表完全显示

	- 例

		- 

			- 左外连接

				- SELECT `name`, stu.id, grade
    FROM stu LEFT JOIN exam
    ON stu.id = exam.id

			- 右外连接

				- SELECT `name`, stu.id, grade
    FROM stu RIGHT JOIN exam
    ON stu.id = exam.id

- 约束

	- 主键

		- 内容不能重复，不能为空，否则会报错。

			- CREATE TABLE t(
    id INT PRIMARY KEY,
    `name` VARCHAR(32)
    );

		- 只能有一列主键，可以是复合主键

			- CREATE TABLE t
    		(id INT ,
    		 `name` VARCHAR(32),
    		 PRIMARY KEY(id, `name`)
    		);

				- 复合主键都相同才不能加入

	- 非空

		- NOT NULL

	- 唯一

		- UNIQUE

			- 定义后该列值不能重复
			- 如果没有指定NOT NULL可以有多个和NULL
			- 一张表可以有多个UNIQUE

	- 外键

		- 用于定义主表和从表之间的关系
		- 表的类型时innode才支持外键
		- 外键字段的类型要和主键字段的类型一致，长度可以不同
		- 外键字段的值必须在主键字段中出现过，或为null，前提是外键字段允许为null
		- 一旦建立主外键关系，数据就不能随意删除了

			- 主表有被指向的元素，该行就删不了

		- 

			- 先建主表,必须有主键或unique约束

				- CREATE TABLE class(
    id NIT PRIMARY KEY,
    `name` VARCHAR(32) NOT NULL DEFAULT '');

			- 再建从表

				- CREATE TABLE student（
    id INT PRIMARY KEY,
    `name` VARCHAR(32) NOT NULL DEFAULT '',
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES class(id)
    )

	- CHECK

		- 5.7不支持，只做语法校验
		- CREATE TABLE table(
    id INT,
    sex VARCHAR(6) CHECK (sex IN('man','woman'))
    );

	- 枚举

		- sex ENUM('man', 'woman')

- 自增长

	- 创建

		- CREATE TABLE table1(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(32),
    `name` VARCHAR(32)
    );

	- 添加

		- INSERT INTO table VALUES(NULL, '123@qq.com', 'jack')

			- 底层为找到最大值再往后加，如果NULL写值则后续从NULL处开始加

		- INSERT INTO table (email, `name`) VALUES ('456@qq,com, 'tom');

	- 一般和主键配合使用，或配合UNIQUE
	- 默认从1开始

		- ALTER TABLE table1 AUTO_INCREMENT = 100;

### 提高效率

- 索引

	- CREATE INDEX empno_index ON emp (empno)

		- 在emp表的empno列创建索引
		- 索引本身也会占用空间
		- 只对创建了索引的列有效

	- 原理

		- 没有索引

			- 全表扫描

		- 有索引

			- 形成一个索引的数据结构

				- 如二叉树，找一个中间的数，小的在左边，大的在右边

	- 代价

		- 磁盘占用
		- 对DML（修改，删除，添加）速度有影响

			- select占比90%多

	- 类型

		- 主键索引PRIMARY KEY

			- 主键自动地为主索引
			- 创建

				- 创建表时写PRIMARY KEY
				- ALTER TABLE table ADD PRIMARY KEY(id)

		- 唯一索引UNIQUE

			- 某列的值是不重复的，优先考虑
			- 创建

				- CREATE UNIQUE INDEX id_index ON table (id)

		- 普通索引INDEX

			- 可重复
			- 创建

				- CREATE INDEX id_index ON table (id)
				- ALTER TABLE table ADD INDEX id_index(id)

		- 全文索引FULLTEXT

			- 适用于MySISAM一般不用，用Solr和ElasticSecrch搜索框架

	- 删除索引

		- DROP INDEX id_index ON table
		- 删除主键索引

			- ALTER TABLE table DROP PRIMARY KEY

	- 修改索引

		- 先删除再添加

	- 查询索引

		- SHOW INDEXES FROM table
		- SHOW KEYS FROM table
		- DESC table

			- 有关索引信息少

	- 小结

		- 频繁作为查询条件的字段应该创建索引
		- 唯一性太差的字段不适合创建索引，即使频繁作为查询条件，如性别
		- 更新非常频繁的字段不适合创建索引，登录次数
		- 不会出现在WHERE子句中的字段不该创建索引

### 事物

- 用于保证数据的一致性，它是由一组相关的dml语句组成，要么全部成功，要么全部失败，如转账就要用事务处理
- 执行事物操作时，mysql会在表上加锁，防止其他用户该表的数据
- 基本操作

	- 开始事物

		- START TRANSACTION

	- 设置保存点

		- SAVEPOINT a

	- 执行dml操作

		- INSERT INTO table VALUES(1, 'tom')

	- 设置保存点

		- SAVEPOINT b

	- 执行dml操作

		- INSERT INTO table VALUES(2, 'jack')

	- 回退

		- ROLLBACK TO b

			- 注意

				- 直接回到a点就不能回到b点

		- ROLLBACK

			- 回退到事物开始状态

	- 提交事务

		- COMMIT

			- 提交后就不能回退
			- 其他会话才可以查到更新后的新数据

- 细节

	- 不开始事物，dml会自动提交，不能回滚
	- 开始事物没创建保存点，默认回退到事物开始的状态
	- 没提交是可以创建多个保存点
	- 事物需要innodb存储引擎，myisam不支持
	- SET AUTOCOMMIT=OFF也是开启事物

- 隔离级别

	- 不考虑隔离级别会有的问题

		- 脏读dirty read

			- 一个事物读取另一个事物尚未提交的修改

		- 不可重复度nonrepeatable read

			- 同一查询在同一事物中多次进行，由于其他提交事务所作的修改或删除，每次返回不同的结果集

		- 幻读phantom read

			- 同一查询在同一事物中多次进行，由于其他提交事务所做的插入操作，每次返回不同的结果集

	- 级别

		- 

	- 查看级别

		- 当前会话

			- SELECT @@tx_isolation

		- 当前系统

			- SELECT @@global.tx_isolation

	- 更改级别

		- SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
		- SET SESSION TRANSACTION ISOLATION LEVEL read committed
		- SET SESSION TRANSACTION ISOLATION LEVEL repeatable read
		- SET SESSION TRANSACTION ISOLATION LEVEL serializable

			- 有别的事物在操作没有提交，就会卡住

		- 和set后面加global

	- ACID特性

		- Atomicity

			- 原子性指事物是一个不可分割的工作单位，事物中的操作要么都发生，要么都不发生

		- Consistency

			- 一致性，事物必须使数据库从一个一致性状态更新到另外一个一致性状态

		- Isolation

			- 隔离性，多个用户并发访问数据库时，数据库为每一个用户开启的事物不能被其他事务的操作数据所干扰，多个并发事务之间要互相隔离

		- Durability

			- 持久性，是指一个事务一旦被提交，他对数据库中数据的改变就是永久性的

### 表类型和存储引擎

- 存储引擎Storage Engines

	- SHOW ENGINES

		- InnoDb 

			- 写的处理效率差一些，会占用更多的磁盘空间以保留数据和索引
			- 支持事务，支持外键，支持行级锁

		- MEMORY

			- 存在内存，对零时表有用，一旦mysql服务关闭，表中数据就会消失，表的结构还在。访问非常快，默认HASH索引
			- 执行速度很快，没有IO读写
			- CREATE TABLE table(
    id INT,
    `name` VARCHAR(32)) ENGINE MEMORY

		- BLACKHOLE
		- MyISAM

			- 不支持事务，不支持外键,支持表级锁
			- 访问速度快，对事物完整性没有要求
			- CREATE TABLE table(
    id INT,
    `name` VARCHAR(32)) ENGINE MYISAM

		- 

	- 选择

		- 不需要事物，处理基本CRUD

			- MyISAM首选

		- 需要事物

			- InnoDB

		- 用户在线状态

			- Memory

	- 修改引擎

		- ALTER TABLE table ENGINE = engine

### 视图

- 基本使用

	- 创建

		- CREATE VIEW emp_view AS SELECT empno,ename,job,deptno FROM emp;

	- 查看

		- SELECT * FROM emp_view

	- 查看创建视图的指令

		- SHOW CREATE VIEW emp_view

	- 删除

		- DROP VIEW emp_view

- 细节

	- 创建视图后，只有一个对应的视图结构文件.frm
	- 视图中可以再使用视图
	- 视图是一个虚拟表，其数据来自对应的真实表（基表）
	- 视图可以修改基表数据，基表改变会影响视图数据

- 最佳实践

	- 重要信息隐藏
	- 避免使用JOIN提高效率
	- 旧表将被废弃，但很多应用基于这张表

### 用户管理

- mysql的用户都存储在系统数据库mysql的user表中

	- 列

		- host

			- 允许登陆的位置，localhost表示该用户只允许本机登录，也可指定ip地址

		- user

			- 用户名

		- authentication_string

			- 密码，通过password()加密

	- 操作

		- 创建用户

			- CREATE USER '用户名'@'登录ip' IDENTIFIED BY '密码‘

		- 删除用户

			- DROP USER '用户名’@‘登陆地址’

		- 修改密码

			- 修改自己密码

				- SET PASSWARD = PASSWARD('新密码‘)

			- 修改别人密码，需要权限

				- SET PASSWARD FOR '用户名'@’登录ip‘ = PASSWARD('新密码’）

	- 权限

		- 操作

			- 授权

				- GRANT 权限列表 ON 库.对象名 TO ‘用户名@’登录ip‘ [IENDTIFIED  BY '密码’（存在则为改密码，不存在则创建）]

			- 回收

				- REVOKE 权限列表 ON 库.对象名 FROM ‘用户名’@‘登陆位置’

			- 权限生效指令

				- 没生效可以用FLUSH PRIVILEGES

		- 权限

			- ALL
			- SELECT
			- INSERT
			- DROP
			- DELETE
			- UPDATE
			- 子主题 7

	- 细节

		- 在创建用户时，不指定Host，则为%，表示所有ip都有权限连接

			- ip可知指定范围：192.168.1.%

		- 删除用户时如果host不是%，则需明确指定‘用户’@‘host值’

## JDBC和连接池

### 为访问不同数据库提供了统一的接口，为使用者屏蔽了细节问题。

### 驱动文件.jar

### 编写步骤

- 注册驱动

	- 获取连接

		- 执行增删改查

			- 释放资源

- 五种方式

	- 将.jar放到项目文件夹下libs文件夹内，add to library
	- 关闭连接资源

		- statement.close();
	connect.close();

	- 一

		- 步骤

			- 注册驱动

				- Driver driver = new Driver()

			- 得到连接

				- String url = "jdbc:mysql://localhost:3306/db02";

					- jdbc:mysql://

						- 规定好，表示协议

					- localhost

						- 主机，可以是ip地址

					- 3306

						- mysql监听的端口

					- db02

						- 数据库

			- 将用户名和密码放入Properties对象

				- Properties properties = new properties();
	properties.setProperty("user","用户名");//root
	properties.setProperty("password","密码")

			- 获取连接

				- Connection connect = driver.connect(url,properties)

			- 执行sql

				- String sql = "insert into user1 values(‘ls’,3) ";
		//statement用于执行静态SQL语句并返回其生成的结果对象
		Statement statement = connect.createStatement();
		//rows，如果是dml语句，返回的就是影响的行数，1代表成功，0代表失败
		int rows = statement.executeUpdate(sql);
		System.out.println(rows>0? "成功":"失败");
				- sql="update user2 set name_name='lby' where id = 3";
				- sql="delete from user2 where id=3;

		- 缺点

			- 直接使用Drive(),静态加载，灵活性差，依赖强

	- 二

		- 步骤

			- 反射加载Driver类

				- Class<?> aclass = Class.forName("com.mysql.jdbc.Driver");
	Driver driver = (Driver)aclass.newInstance();

			- 得到链接到获取连接与方式一相同

		- 优点

			- 反射加载Driver类，动态加载，更加的灵活，减少依赖性

	- 三

		- 特点

			- 用DriverManager替代Driver进行统一管理

		- 步骤

			- 反射加载Driver类

				- Class<?> aclass = Class.forName("com.mysql.jdbc.Driver");
	Driver driver = (Driver)aclass.newInstance();

			- 创建url,user,password

				- String url = "jdbc:mysql://localhost:3306/db02;
	String user = "root";
	String password = "密码";

			- 注册Drive驱动

				- DriverManager.registerDriver(driver);

			- 得到连接

				- Connection connection = DriverManager.getConnection(url,user,password);

		- 优点

			- 统一管理

	- 四

		- 特点

			- 使用Class.forName自动完成注册，简化代码
			- 使用最多

		- 步骤

			- 反射加载

				- Class.forName("com.mysql.jdbc.Driver");

			- 创建url,user,password

				- String url = "jdbc:mysql://localhost:3306/db02;
		String user = "root";
		String password = "密码";

			- 得到连接

				- Connection connection = DriverManager.getConnection(url,user,password);

	- 五

		- 特点

			- 四上改进，增加配置文件，让连接mysql更灵活

		- 步骤

			- 写.properties

				- user=root
			password=密码
			url=jdbc:mysql://localhost:3306/db02
			driver=com.mysql.jdbc.Driver

			- 从properties获取信息

				- Properties properties = new Properties();
			properties.load(new FileInputStream("src\\xx.properties"));
			String user = properties.getProperty("user");
			String passward = properties.getProperty("passward");
			String driver = properties.getProperty("driver");
			String url = properties.getProperty("url");

			- 新版本可以不写

				- Class.forName(driver);

			- 得到链接

				- Connection connection = DriverManager.getConnection(url, user, password);

### ResultSet结果集

- 基本介绍

	- 表示数据库结果集的数据表，通常通过执行查询数据库的语句生成
	- ResultSet对象保持一个光标指向其当前行的数据行。最初，光标位于第一行之前
	- next方法将光标移动到下一行，并且由于在ResultSet对象中没有更多行时返回false，因此可以在while循环中遍历结果集

- 示例

	- 得到连接后

		- Statement statement = connection.createStatement();
String sql = "select id,name from user2"
ResultSet resultSet = statement.executeQuery(sql);
		- while (resultSet.next()){
    int id = resultSet.getInt(1);//获取该行的第一个数据
    String name = retultSet.getString(2);
    sout(id+"\t"+name);
}
		- resultSet.close();
statement.close();
connection.close();

### Statement

- 建立连接后，对数据库访问，执行可通过

	- Statement

		- 问题

			- 存在SQL注入风险

				- 利用某些系统没有对用户输入的数据进行充分的检查，而在用户输入数据中注入非法的sql语句段或命令，恶意攻击数据库

					- SELECT * FROM emp
    WHERE   `name` = '1' OR' AND pwd = 'OR '1' = '1'

	- PreparedStatement

		- 预处理
		- 好处

			- 不再用+拼接sql语句，减少语法错误
			- 有效解决sql注入问题
			- 减少编译次数，效率高

		- 使用

			- String sql = "select name,pwd from admin where name=? and pwd=?"
PreparedStatement preparedStatement = connection.prepareStatement(sql);
preparedStatement.setString(1,admin_name);//第一个参数为问好的序号，第二个为替换问好的内容
preparedStatement.setString(2,admin_pwd);
			- ResultSet resultSet = preparedStatement.executeQuery();

				- 如果是dml语句，则用executeUpdate

					- sql="insert into admin values(?,?)
PreparedStatement preparedStatement = connection.prepareStatement(sql);
preparedStatement.setString(1,admin_name);
preparedStatement.setString(2,admin_pwd);
int rows = preparedStatement.executeUpdate();
sout(rows>0? "执行成功":"执行失败");

preparedStatement.close();
connection.close();

			- if (resultSet.next()){
	sout("登陆成功);
else{
    sout("登陆失败")
}
			- resultSet.close();
preparedStatement.close();
connecton.close();

	- CallableStatement
	
		- 存储过程

### API

- DriverManager驱动管理类

	- getConnection(url,user,pwd)

- Connection接口

	- createStatement
	- preparedStatement(sql)

- Statement接口

	- executeUpdate(sql)

		- 执行dml语句，返回受影响语句

	- executeQuery(sql)

		- 执行查询，返回ResultSet对象

	- execute(sql)

		- 执行任意sql，返回布尔值

- PreparedStatement接口

	- executeUpdate(sql)

		- 执行dml语句，返回受影响语句

	- executeQuery(sql)

		- 执行查询，返回ResultSet对象

	- execute(sql)

		- 执行任意sql，返回布尔值

	- setXxx(占位符索引，占位符的值)
	- setObect(占位符索引，占位符的值)

- ResultSet结果集

	- next()

		- 向下移动一行，没有下一行返回false

	- previous()

		- 向上移动一行，没有上一行返回false

	- getXxx(列索引/列名)

		- 返回对应列的值，接收类型是Xxx

	- getObject(列索引/列名)

		- 返回对应列的值，接收类型是Object

### jdbc工具类

- public class JDBCUtils{
    private static String user;
    private static String password
    private static String url
    private static String driver

    static{
        try{
            Properties properties = new Properties();
            properties.load(new FileInputStream("src\\xx.properties"));
            user = properties.getProperty("user");
            password = properties.getProperty("password");
            url = properties.getProperty("url ");
            driver = properties.getProperty("driver");
        }
        catch (IOException e){
            //将编译异常转换成运行异常，调用者可以选择捕获该异常或选择默认处理，比较方便
            throw new RuntimeException(e);
        }
    public static Connection getConnection(){
        try{
            return DriverManager.getConnection(url,user,password);
        }
        catch(SQLException e){
            throw new RuntimeException(e);
        }
    }
    
    public static void close(ResultSet set, Statement statement, Connection connection){
        try{
            if(set!=null){
                set.close()
            if(statement!=null){
                statement.close()
            }
            if(connection!=null){
                connection.close()
            }
        }
        catch(SQLException e){
            throw new RuntimeException(e);
        }
    }
    }
- 使用

	- Connection connection = null;
String sql = "update actor set name = ? where id = ?';
ProparedStatement preparedStatement = null;
try{
    connection = JDBCUtils.getConnection();
    preparedStatement = connection.prepareStatement(sql);
    preparedStatement.setString(1,"周星驰")
    preparedStatement.setString(2, 3);
}
catch(SQLException e){
    e.printStackTrace();
}
finally{
    JDBCUtils.close(null,preparedStatement, connection);
}

### 事物

- String sql1 = "update account set balance=balance-100 where id = 1";
String sql2 = "update account set balance=balance+100 where id = 2";
try{
    connection.setAutoCommit(false);//开启事物
    connection = JDBCUtils.getConnection();
    preparedStatement = connection.prepareStatement(sql1);
    preparedStatement.execute();
    int i = 1/0;
    preparedStatement = connection.prepareStatement(sql2);
    preparedStatement.execute();

    connection.commit();
}
catch(SQLException e){
    connection.rollback();//回滚，撤销sql语句
    e.printStackTrace();
}
finally{
    JDBCUtils.close(null,preparedStatement, connection);
}

### 批处理

- 执行大量语句时较快，减少编译次数，减少网络开销
- sql="insert into admin values(?,?)
	for(int i = 0; i<5000; i++){
    preparedStatement.setString(1,"jack"+i);
    preparedStatement.setString(2,"666");
    preparedStatement.addBatch();
    if((i+1)%1000==0){
        preparedStatement.executeBatch();
        preparedStatement.clearBatch();
    }

	- .properties中的url后面要加？rewriteBatchedStatements=true才支持批处理

### 连接池

- 传统缺点

	- 传统连接，每次连接时要把Connection加载到内存中，再验证IP地址，用户名和密码（0.05~1s)
	- 每次用完都得断开，如果程序出现异常未能关闭，将导致数据库内存泄露，导致重启数据库
	- 连接过多会崩溃

- 原理

	- 预先在缓冲池中放入一定数量的连接，用完后放回
	- 超过最大连接数量时，加入等待队列

- 常见连接池

	- C3P0

		- 速度相对慢，稳定性不错
		- 使用

			- 将C3P3的jar包放到libs下
			- 方式一

				- //创建一个数据源对象
ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();
//通过配置文件mysql.properties获取相关的连接信息
Properties properties = new Properties();
properties.load(new FileInputStream("src\\mysql.properties"));
String user = properties.getProperty("user");
String password = properties.getProperty("pwd");
String url = properties.getProperty("url");
String driver = properties.getProperty("driver");
//给数据源comboPooledDataSource设置相关的参数
//连接管理由comboPooledDataSource来管理
comboPooledDataSource.setDriverClass(driver);
comboPooledDataSource.setJdbcUrl(url);
comboPooledDataSource.setUser(user);
comboPooledDataSource.setPassword(password);
//初始化连接数
comboPooledDataSource.setInitialPoolSize(10);
comboPooledDataSource.setMaxPoolSize(50);
//连接
Connection connection = comboPooledDataSource.getConnection();
System.out.println("连接成功");
connection.close();

//测试连接五千次时间
long start = System.currentTimeMillis();
for (int i = 0; i < 5000; i++) {
    Connection connection1 = comboPooledDataSource.getConnection();
    connection1.close();
}
long end = System.currentTimeMillis();
System.out.println(end - start);

			- 方式二
	
				- 写配置文件c3p0-config.xml
	
					- <c3p0-config>
	<!-- 数据源名称代表连接池 -->
	<named-config name="lby_tech">
	    <!-- 驱动类 -->
	    <property name="driverClass">com.mysql.jdbc.Driver</property>
	    <!-- url -->
	    <property name="jdbcUrl">jdbc:mysql://localhost:3306/db02</property>
	    <!--用户名-->
	    <property name="user">root</property>
	    <!--密码-->
	    <property name="password">1212qweasdzxc</property>
	    <!--每次增长的连接数-->
	    <property name="acquireIncrement">5</property>
	    <!--初始连接数-->
	    <property name="initialPoolSize">10</property>
	    <!--最小连接数-->
	    <property name="minPoolSize">5</property>
	    <!--最大连接数-->
	    <property name="maxPoolSize">50</property>
	    <!--可连接的最多命令对象数-->
	    <property name="maxStatements">5</property>
	    <!--每个连接对象可连接的最多的命令对象数-->
	    <property name="maxStatementsPerConnection">2</property>
	</named-config>
</c3p0-config>

				- //使用配置文件模板完成
ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource("lby_tech");
Connection connection = comboPooledDataSource.getConnection();
System.out.println("连接成功");
connection.close();

	- DBCP
	
		- 速度相对C3P0快，不稳定
	
	- Proxool
	
		- 有监控连接池状态的功能，稳定性较C3P0差一点
	
	- BoneCP
	
		- 速度快
	
	- Druid德鲁伊
	
		- 阿里的
		- 集DBCP,C3P0,Proxool优点于一身
		- 绝大多数项目使用

