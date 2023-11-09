## 数据库迁移管理

# database first

维护sql文件，每一个sql文件唯一不能更改，只能append新的sql文件修改，文件以00000_detail.
sql命名，保证顺序唯一。启动服务时候，liquibase自动同步sql文件到数据库。（包括测试库）

这样保证：数据库修改来源唯一，可以追溯记录，可以回滚。

## 集成测试

1. 使用相同的数据库（以后换成testContainer）
2. 启动时候同步数据库结构
3. 每个测试时候在beforeEach时候清空对应表数据