# 该image文件继承官方的node image
FROM node:alpine

# 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入image文件的/app目录
COPY . /app

# 指定接下来的工作路径为/app
WORKDIR /app

# 在/app目录下，运行npm install命令安装依赖pm2
RUN npm install pm2 -g --registry=http://registry.npm.taobao.org

# 将容器9001端口暴露出来，允许外部连接这个端口
EXPOSE 9001

# 容器启动后自动执行下面命令
CMD ["sh", "boot.sh"]
