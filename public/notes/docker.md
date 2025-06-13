# 概念

+ 快速构建、运行、管理应用的工具
+ 安装应用时，会自动搜索并下载镜像(image)。包含应用本身和运行需要的环境、配置、系统函数。
+ docker会在运行镜像时创建一个隔离环境，称为容器(container)

# 初始化

+ 安装

+ 查看版本：docker -v

+ 启动：

  ```
  # 启动Docker
  sudo systemctl start docker
  
  # 设置开机自启
  sudo systemctl enable docker
  
  # 停止Docker
  systemctl stop docker
  
  # 重启
  systemctl restart docker
  
  #如果命令不报错，则说明安装启动成功
  docker ps
  ```

  

# 命令

+ 安装MySQL

  ```
  sudo docker run -d \
  	--name mysql \
  	-p 3306:3306 \
  	-e MYSQL_ROOT_PASSWORD=123 \
  	mysql
  ```

  + docker run：创建并运行一个容器，-d是让容器在后台运行 
  + --name mysql：给容器起个名字，必须唯一
  + -p 3306:3306：设置端口映射，前面是宿主机端口，后面是容器内端口
  + -e KEY=VALUE：设置环境变量
  + mysql：指定运行的镜像的名字
    + 一般两部分组成[repository]:[tag]，repository是镜像名，tag是镜像的版本，mysql:5.7，不写默认最新版本

+ docker pull：从镜像仓库拉镜像

+ docker images：查看下载的所有镜像

+ docker rmi：移除镜像

+ docker build：构建自己的镜像

+ docker save：将镜像保存为文件

+ docker load：加载镜像文件

+ docker push：推送docker镜像到云端

## 常用命令

+ docker pull：从镜像仓库拉镜像

+ docker images：查看下载的所有镜像

+ docker rmi：移除镜像

+ docker build：构建自己的镜像

+ docker save：将镜像保存为文件

+ docker load：加载镜像文件

+ docker push：推送docker镜像到云端

+ docker run：创建并运行容器

+ docker stop：停止容器进程

+ docker start：开启容器内停止的容器进程

+ docker ps：查看容器进程状态

  + -a：查看全部

  + --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{Names}}"：格式化输出

+ docker rm：移除容器

+ docker logs：查看日志`sudo docker logs -f nginx`
  + -f：跟随查看，ctrl+c退出

+ docker exec：进入容器内部`sudo docker exec -it nginx bash`

  + -it：加一个可交互终端

  + exit退出
  + bash：以命令行方式

docker xx --help：获取命令文档

![image-20250601200753614](D:\BaiduSyncdisk\typora笔记本\img\image-20250601200753614.png)





## 命令别名

1. 进入：`vi ~/.bashrc`
2. 修改
3. 使文件生效：`source ~/bashrc`





# nginx

+ 静态资源目录：/usr/share/nginx/html
+ 配置文件目录：/etc/nginx/conf

+ 修改静态资源：
  + docker exec -it nginx bash
  + cd /usr/share/nginx/html
  + 发现没有vi编辑器->数据卷登场





# 数据卷

+ 是一个虚拟目录，是容器内目录与宿主目录之间映射的桥梁
+ 宿主机文件位置：/var/lib/docker/volumes
  + nginx的静态资源：/html/_data

## 命令

+ docker volume create：创建数据卷
+ docker volume ls：查看所有数据卷
+ docker volume rm：删除指定数据卷
+ docker volume inspect：查看某个数据卷的详情
  + docker volume inspect html
+ docker volume prune：清除未使用的数据卷
+ docker volume --help：查看命令帮助信息



## 使用

+ 在执行docker run命令时，使用**-v 数据卷:容器内目录**完成数据卷挂在（创建容器后不可挂载）
+ 在创建容器时，如果挂载了数据卷且数据卷不存在，会自动创建数据卷
+ 例：挂在nginx的html
  + docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html  nginx



## 本地目录挂载

+ 在执行docker rum命令时，用 **-v 本地目录:容器内目录**可完成本地目录挂载

+ 在删掉容器时，数据不丢失

+ 本地目录必须以'/'或'./'开头，如果直接以名称开头，会被识别为数据卷而非本地目录

  + -v mysql:/var/lib/mysql会被识别为一个数据卷叫mysql
  + -v ./mysql:/var/lib/mysql会被识别为当前目录下的mysql目录

+ mysql挂载

  1. 挂载/ubuntu/mysql/data到容器内的/var/lib/mysql

  2. 挂载/ubuntu/mysql/init到容器内的/docker-entrypoint-initdb.d目录（资料）

  3. 挂载/ubuntu/mysql/conf到容器内的/etc/mysql/conf.d目录（资料）

     ````bash
     docker run -d \
     	--name mysql \
     	-p 3306:3306 \
     	-e TZ=Asia/Shanghai \
     	-e MYSQL_ROOT_PASSWORD=1212qweasdzxc \
     	-v /home/ubuntu/mysql/data:/var/lib/mysql \
     	-v /home/ubuntu/mysql/init:/docker-entrypoint-initdb.d \
     	-v /home/ubuntu/mysql/conf:/etc/mysql/conf.d \
     	mysql
     ````

     

# Dockerfile语法

+ Dockerfile是一个文本文件，其中包含一个个指令（Instruction），用指令来说明要执行什么操作来构建镜像。将来Docker可以根据Dockerfile帮我们构建镜像

+ 常见指令

  | 指令       | 说明                                         | 实例                                                         |
  | ---------- | -------------------------------------------- | ------------------------------------------------------------ |
  | FROM       | 指定基础镜像                                 | FROM ubuntu:16.04                                            |
  | ENV        | 设置环境变量，可在后面指令使用               | ENV key value                                                |
  | COPY       | 拷贝本地文件到镜像的指定目录                 | COPY ./jrell.tar.gz /tmp                                     |
  | RUN        | 执行Linux的shell命令，一般是安装过程的命令   | RUN tar -zxvf /tmp/jrell.tar.gz && EXPORTS path=/tmp/jrell:$path |
  | EXPOSE     | 指定容器运行时监听的端口，是给镜像使用者看的 | EXPOSE 8080                                                  |
  | ENTRYPOINT | 镜像中应用的启动命令，容器运行时调用         | ENTRYPOINT java -jar xx.jar                                  |

  

+ 构建java镜像

  1. 准备一个Linux运行环境

  2. 安装JRE并配置环境变量

  3. 拷贝jar包

  4. 编写运行脚本

     ```dockerfile
     # 指定基础镜像
     FROM ubuntu:16.04
     # 配置环境变量，JDK的安装目录、容器内时区
     ENV JAVA_DIR=/usr/local
     # 拷贝jdk和java项目的包
     COPY ./jdk8.tar.gz $JAVA_DIR/
     COPY ./docker-demo.jar /tmp/app.jar
     # 安装JDK
     RUN cd $JAVA_DIR \ && tar -xf ./jdk8.tar.gz \
     && mv ./jdk1.8.0_144 ./java8
     ENV JAVA_HOME=$JAVA_DIR/java8
     ENV PATH=$PATH:$JAVA_HOME/bin
     # 入口，java项目的启动命令
     ENTRYPOINT ["java", "-jar", "/app.jar"]
     ```

     ```dockerfile
     # 基础镜像
     FROM openjdk:11.0-jre-buster
     # 拷贝jar包
     COPY docker-demo.jar /app.jar
     # 入口
     ENTRYPOINT [”java", "-jar", "app.jar"]
     ```

     

+ 名词

  + 层(Layer)
    + 添加安装包、依赖、配置等，每次操作都形成新的一层
    + 好处：没改的不用反复构建
  + 基础镜像（BaseImage）
    + 应用依赖的系统函数库、环境、配置、文件等
  + 入口（Entrypoint）
    + 镜像运行入口，一般是程序启动的脚本和参数



# 自定义镜像

1. 写好Dockerfile
2. 命令构建镜像`docker build -t myImage:1.0 .`
   + -t：给镜像起名，格式是repository:tag，不指定tag，默认是latest
   + .：指定Dockerfile所在目录，如果在当前目录，则指定为"."





# 容器的网络互连

## 网络

+ 默认情况下，所有容器都是以bridge方式连接到Docker的一个虚拟网桥上

+ 加入自定义网络的容器才可以通过容器名互相访问，Docker的网络操作命令：

  | 命令                                                         | 说明                     |
  | ------------------------------------------------------------ | ------------------------ |
  | docker network create 网络名                                 | 创建一个网络             |
  | docker network ls                                            | 查看所有网络             |
  | docker network rm                                            | 删除指定网络             |
  | docker network prune                                         | 清除未使用的网络         |
  | docker network connect 网络名 容器名                         | 是容器连接加入某网络     |
  | docker network disconnect                                    | 使指定容器连接离开某网络 |
  | docker network inspect                                       | 查看网络详细信息         |
  | ip addr                                                      | 查看网卡信息             |
  | docker run -d --name lbytech-backend -p 8080:8080 --network lbytech lbytech-backend | 启动容器时指定网络       |





# 部署

## java项目

application.yml：

```yaml
spring:
	datasource:
		url: jdbc:mysql://${hm.db.host}:3306/hmall?useUnicode=true&characterEncoding=UTF-8
		dirver-class-name: com.mysql.cj.jdbc.Driver
		username: root
		password: ${hm.db.pw}
```

application-prod.yml

```yaml
hm:
	db:
		host: mysql # 容器名
		pw: 123
```

application-dev.yml

```yaml
hm:
	db:
		host: http://106.53.121.165/
		pw: 123
```



## 前端项目

把下面这个目录放到/homt/ubuntu中

+ nginx
  + html
    + dist	# 前端打包目录，html下可以放多个，改nginx.conf即可
  + nginx.conf

运行命令

```bash
docker run -d \
	--name nginx \
	-p 3000:3000 \
	#-p 18080:18080 \	#如果有多个可以写多个
	-v /home/ubuntu/nginx/html:/usr/share/nginx/html \
	-v /home/ubuntu/nginx/nginx.conf:/etc/nginx/nginx.conf \
	--network 网络名 \
	nginx
```





# 部署lbytech

## 后端

1. 把Dockerfile和jar包放到/home/ubuntu/lbytech下
2. 构建环境：docker pull openjdk:11.0-jre-buster
3. cd lbytech
4. 构建镜像：docker build -t lbytech-backend .
5. 运行镜像：docker run -d --name lbytech-backend -p 8080:8080 lbytech-backend
   + 前面是运行实例名字，后面是镜像名
6. 查看java日志：docker logs -f lbytech-backend



##  前端

1. 把下面这个目录放到/homt/ubuntu/lbytech中(更新nginx用docker restart nginx)
   + nginx
     + html
       + dist	# 前端打包目录，html下可以放多个，改nginx.conf即可
     + nginx.conf

2. 运行命令

   ```bash
   docker run -d \
   	--name nginx \
   	-p 80:80 \
   	-p 3000:3000 \
   	-v /home/ubuntu/lbytech/nginx/html:/usr/share/nginx/html \
   	-v /home/ubuntu/lbytech/nginx/nginx.conf:/etc/nginx/nginx.conf \
   	--network lbytech \
   	nginx
   ```





# DockerCompose（章鱼）

+ 通过一个单独的docker-compose.yml模板文件，来定义一组相关联的应用容器，帮助我们实现多个相互关联的Docker容器的快速部署

  ```yaml
  version: "3.8"
  services:
  	mysql:
  		image: mysql
  		container_name: mysql
  		ports:
  			- "3306:3306"
  		environment:
  			TZ: Asia/Shanghai
  			MYSQL_ROOT_PASSWORD: 1212qweasdzxc
  		volumes:
  			- "./mysql/conf:/etc/mysql/conf.d"
  			- "./mysql/data:/var/lib/mysql"
  			- "./mysql/init:/docker-entrypoint-initdb.d"
  		networks:
  			-lbytech
  	lbytech-backend:
  		build:
  			context: .
  			dockerfile: Dockerfile
  		container_name: lbytech-backend
  		ports:
  			- "8080:8080"
  		networks:
  			- lbytech
  		depends_on:
  			-mysql	# 先创建mysql容器
  	nginx:
  		image: nginx
  		container_name: nginx
  		ports:
  			- "80:80"
  			- "3000:3000"
  		volumes:
  			- "./nginx/nginx.conf:/etc/nginx/nginx.conf"
  			- "./nginx/html:/usr/share/nginx/html"
  		depends_on
  			- lbytech-backend
  		networks:
  			-lbytech
  	networks:
  		lbytech
  			name:lbytech
  ```

  

## 命令

`docker compose [options] [command]`

+ options
  + -f：指定compose文件的路径和名称
  + -p：指定project名称
  + -d：后台运行
+ commands
  + up：创建并启动所有service容器
  + down：停止并移除所有容器、网络
  + ps：列出所有启动的容器
  + logs：查看指定容器的日志
  + stop：停止容器
  + start：启动容器
  + restart：重启容器
  + top：查看运行中的进程
  + exec：在指定的运行中容器执行命令