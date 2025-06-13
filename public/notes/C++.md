# C++

## 开头

```c++
#include <iostream>
#include <自定义的类.h>
using namespace std;
```





## 类

### 注意

+ 定义对象时，数据成员不能被初始化（因为类是一种数据类型，定义时系统不分配存储空间



### 成员函数的定义

```c++
返回值类型 类名::函数名(参数表){
    函数体
}

int Person::GetAge(void){
    return(Age);
}
```

### 继承

构造函数：

```c++
Student::Student(string id, string name, int score):Person(id,name){
    Score = score
}
```





### 构造器

#### 定义

+ 可以在类中定义，也可以在类外定义

```c++
Goods(string name,int amount){
    strcpy(Name,name);
    Amount = amount;
}
```



#### 四种使用方式

1. Student lby = Student("lby", 21);

2. Student lby("lby", 21);

3. Student *lby = new Student("lby", 21);

##### 使用默认构造器

1. Student lby;
2. Student lby = Student();
3. Student lby(); //错误，相当于声明一个函数
4. Student *lby = new Student;



#### 注意

构造器形参不能和属性重名，可在类属性名后加_解决



### 析构函数

#### 作用
跟踪对象，直道其过期，完成清理工作
##### 作用时机
1. 静态存储对象：程序结束时自动调用
2. 自动存储类对象：执行完代码块时自动调用
3. new创建：贮存在栈内存或自由存储区中，使用delete释放内存时，自动调用	
4. 临时对象：用完自动调用







## 函数
### const

1. 防止指针修改指向的值

```c++
int age = 21;
const int * pt = &age;
```

2. 防止改变指针指向的位置

   ‘’‘



## 友元函数

```c++
class MyClass {
private:
    int privateVariable;
public:
    MyClass(int val) : privateVariable(val) {}
    friend void friendFunction(MyClass& obj);
};

void friendFunction(MyClass& obj) {
    // 可以访问MyClass类的私有成员privateVariable
    std::cout << "The private variable value is: " << obj.privateVariable << std::endl;
}

int main() {
    MyClass myObj(5);
    //调用
    friendFunction(myObj);
    return 0;
}
```

+ 不是成员函数

+ 要在类内声明，类外定义

+ 用途：

  1. 操作符重载

     ```c++
     //复数
     class Complex {
     private:
         double real;
         double imag;
     public:
         Complex(double r = 0, double i = 0) : real(r), imag(i) {}
         friend std::ostream& operator<<(std::ostream& os, const Complex& c);
     };
     std::ostream& operator<<(std::ostream& os, const Complex& c) {
         os << c.real << " + " << c.imag << "i";
         return os;
     }
     
     //调用
     int main() {
         Complex c(3.0, 4.0);  // 创建一个Complex类对象，实部为3.0，虚部为4.0
         // 调用友元函数operator<<，这里会自动匹配到我们重载的版本
         std::cout << c << std::endl;  
     
         return 0;
     }
     ```

     

  2. 增强类之间的交互

     + 当两个类需要紧密合作，并且其中一个类需要访问另一个类的私有成员时，友元函数提供了一种灵活的方式来实现这种访问。







## 指针和引用

指针：

```c++
//声明
int a = 10;
int* ptr;
//让ptr指向a的地址
ptr = &a;
//修改a的值
*ptr = 20;
//更改ptr指向的对象
int b = 30;
ptr = &b;
```

引用：

```c++
//引用
int a = 10;
int& ref = a;//ref完全等同于a
//修改a的值
ref = 20;

```

