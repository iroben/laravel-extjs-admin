#说明
	本项目主要用laravel5.1，extjs6 gpl版（GPL版有个小bug，treeview设置iconCls无效，有条件的可以购买PRO版，或者等下一版修复）。
	本项目提供了基本的用户管理，角色管理，权限管理和两个demo app，根据登录用户的角色加载相应的功能。
	
#开发说明
	功能最好按项目来划分，一个项目单独一个命名空间，配置文件也独立分开，程序会加载envs目录下面所有以.env结尾的文件，js文件也是如此。
	
#使用安装
	使用前请先确保以下要求：
		1. 已经安装composer
		2. PHP版本大于5.5.9
		3. MYSQL数据库
		
##安装
	1. composer install
	2. 复制.env.sample为.env，修改数据库配置信息
	3. 复制envs/.app1.env.sample为envs/.app1.env，修改数据库配置信息
	4. 复制envs/.app2.env.sample为envs/.app2.env，修改数据库配置信息
	5. 创建.env, envs/.app1.env, .app2.env中指定的数据库
	6. php artisan migrate --seed
	7. 添加服务器信息，域名指定到public目录下（假如已经安装homestead, 可用 serve laraveladmin.admin.cn */laravel-extjs-admin/public）
	8. 将域名加到hosts文件中
	9. 浏览器打开 http://laraveladmin.admin.cn
##备注
	用户信息在 database/migrations/seeds/AdminUserSeeder.php中可以看到
	角色管理员功能还没相到怎么弄，暂未实现
	欢迎大家反馈bug
	
	使用交流群：105617211，加群请注明： github