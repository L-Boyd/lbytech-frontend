# 配置虚拟机（ubuntu）

| 命令                                | 作用                     |
| ----------------------------------- | ------------------------ |
| sudo apt-get install openssh-server | 安装ssh服务              |
| sudo apt install docker.io          | 安装docker               |
| docker -v                           | 查看docker版本           |
| sudo apt update                     | 更新本地软件包的安装信息 |
| sudo apt install openjdk-8-jdk      | 安装jdk8                 |
| java -version                       | 查看java版本             |
| sudo apt install maven              | 安装maven                |
| mvn -v                              | 查看maven版本号          |

+ 疑问
  + 为什么java查看版本是-version，docker是-v
    + 为什么maven安装是maven，查看时mvn



# 关机、注销

| 命令                         | 含义                                   |
| ---------------------------- | -------------------------------------- |
| shutdown -h now              | 立刻关机                               |
| shutdown -h 1                | 一分钟后关机                           |
| shutdown -r now              | 立刻重启计算机                         |
| halt                         | 立刻关机                               |
| reboot                       | 现在重启计算机                         |
| sync                         | 把内存数据同步到磁盘（关机操作前执行） |
| su - "用户名"（如su - root） | 切换用户                               |
| logout（图形界面无效）       | 注销当前用户                           |



# 文件

| 命令                                               | 作用                                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
| ls                                                 | list files，列出目录及文件名<br /><br />-a：列出所有文件，包括隐藏文件(开头为.的文件)<br />-d：仅列出目录本身，而不是列出目录内的文件数据<br />-l：长数据串列出，包括文件的属性与权限等数据 |
| cd [相对路径/绝对路径]                             | change directory，切换目录                                   |
| pwd [-P]                                           | print work directory，显示当前的目录<br /><br />-P：显示出确实的路径，而非使用链接（link）路径 |
| mkdir -[mp] 目录名称                               | make directory，创建一个新的目录<br /><br />-m：配置文件的权限<br />-p：允许创建多级目录 |
| rmdir [-p] 目录名称                                | remove directory，删除一个空的目录<br />-p：一次删除多级空目录 |
| cp -[adfilprsu] 来源档(source) 目标档(destination) | copy file，复制文件或目录<br />-a：相当于-pdr<br />-d：若来源档为链接档的属性(link file)，则复制链接档属性而非文件本身<br />-f：force，若目标文件已存在且无法开启，则移除后再尝试一次<br />-i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行<br />-l：进行硬式链接(hard link)的链接档创建，而非复制文件本身；<br />-p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)<br />-r：递归持续复制，用於目录的复制行为；(常用)<br />-s：复制成为符号链接档 (symbolic link)，亦即“捷径”文件<br />-u：若 destination 比 source 旧才升级 destination |
| rm -[fir] 文件或目录                               | remove，删除文件或目录<br />-f：就是 force 的意思，忽略不存在的文件，不会出现警告信息<br />-i：互动模式，在删除前会询问使用者是否动作<br />-r：递归删除 |
| mv  -[fiu] source destination                      | move file，移动文件与目录，或修改文件与目录的名称<br />-f：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；<br />-i：若目标文件 (destination) 已经存在时，就会询问是否覆盖<br />-u：若目标文件已经存在，且 source 比较新，才会升级 (update) |
| tar -zxvf xx.tar.gz                                | 解压xx                                                       |
| cat -[AbEnTv]                                      | 从第一行开始显示文件内容                                     |
| tac                                                | 从文件内容最后一行开始显示                                   |
| nl -[bnw] 文件                                     | 显示的时候顺道显示行号                                       |
| more                                               | 一页一页地显示文件内容                                       |
| less                                               | 比more多一个向前翻页                                         |
| head [-n number] 文件                              | 只看头几行<br />-n：后面的数组代表显示几行                   |
| tail -[n number]                                   | 只看尾巴几行                                                 |



# RPM软件

| 命令               | 含义                              |
| ------------------ | --------------------------------- |
| rpm -qa            | 查询所安装的所有rpm包             |
| rpm -qa \| more    | 分页                              |
| rpm -qa \| grep xx | 查询当前系统是否安装了xx          |
| rpm -q xx          | 查询软件包是否安装                |
| rpm -qi xx         | 查询软件包信息                    |
| rpm -ql xx         | 查询软件包中包含的软件            |
| rpm -qf xx         | 文件全路径名 查询文件所属的软件包 |
|                    |                                   |
| rpm -e xx          | 卸载xx                            |
|                    |                                   |



# 进程

| 命令                 | 含义              |
| -------------------- | ----------------- |
| ps -ef \| grep redis | 查找redis相关进程 |



# 端口

| 命令          | 含义         |
| ------------- | ------------ |
| netstat -ntlp | 查看端口占用 |



# 目录结构

| 目录        | 内容                                                         |
| ----------- | ------------------------------------------------------------ |
| /bin        | binaries,二进制文件，存放最常用的命令                        |
| /boot       | 启动Linux的一些核心文件                                      |
| /dev        | device的缩写，存放linux的外部设备，在linux中访问设备的方式和访问文件的方式相同 |
| /etc        | etcetera，存放所有的系统管理所需要的配置文件和子目录         |
| /home       | 用户的主目录                                                 |
| /lib        | library，存放系统最基本的动态链接共享库                      |
| /lost+found | 非法关机后，存一些文件                                       |
| /media      | linux自动识别的设备挂载到这个目录                            |
| /mnt        | 让用户临时挂载别的文件系统，我们可以将光驱挂载在/mnt上，然后进入该目录就可以查看光驱内的内容了 |
| /opt        | optional，给主机额外安装软件所摆放的目录                     |
| /proc       | processes，一种虚拟文件系统，存储的是当前内核运行状态的一系列特殊文件 |
| /root       | 超级权限者的用户主目录                                       |
| /sbin       | Superuser Binaries，存放系统管理员使用的系统管理程序         |
| /srv        | 存放一些服务启动后需要提取的数据                             |
| /sys        | 内核设备树的一个直观反映。当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建 |
| /tmp        | temporary，存放临时文件                                      |
| /usr        | unix system resources，类似于windows下的program files目录    |
| /usr/bin    | 系统用户使用的应用程序                                       |
| /usr/sbin   | 超级用户使用的比较高级的管理程序和系统守护程序               |
| /usr/src    | 内核源代码默认的放置目录                                     |
| /var        | variable，存放不断扩充着的东西，习惯将经常被修改的目录放在这个目录下，包括各种日志文件 |
| /run        | 一个临时文件系统                                             |



# 其他命令

| 命令       | 作用                       |
| ---------- | -------------------------- |
| man [命令] | 查看命令使用文档，如man ls |
| sudo su -  | 切换为root                 |
| tail       |                            |





# 快捷键

| 快捷键 | 作用       |
| ------ | ---------- |
| ctrl+L | 控制台清屏 |
|        |            |

