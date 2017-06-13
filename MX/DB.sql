//组织：org
create table mx_org 
{
    org_id          varchar(64)  not null       comment '主键ID',
    name            varchar(110)                comment '组织名称',
    shorter         varchar(64)                 comment '',
    is_school       varchar(2)  DEFAULT '1'     comment '',
    type            varchar(2)  DEFAULT '1'     comment '0:非正式组织， 1：正式组织',
    
    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',

    primary key (org_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='组织';


//机构：dept
create table mx_dept
{
    dept_id          varchar(64)  not null       comment '主键ID',
    org_id           varchar(64)  not null       comment '外键ID',
    father_id        varchar(64)  not null       comment '机构的父键ID',
    name            varchar(110)                 comment '机构名称',
    shorter         varchar(64)                 comment '',
    level           int(5)                       comment '层级',
    
    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (dept_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='机构';


//机构用户：dept_user
create table mx_dept_user
{
    deptuser_id      varchar(64)  not null       comment '主键ID',
    org_id           varchar(64)  not null            comment '外键ID',
    dept_id          varchar(64)  not null            comment '外键ID',
    user_id          varchar(64)  not null       comment '外键ID',
    role_id          varchar(64)    not null           comment '角色ID',
    status                varchar(2)  default '1'   not null     comment '状态:0待审，1已审核， 2审核未通过', 
    
    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (deptuser_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='机构用户';


//用户：user
create table mx_user
{
    user_id           varchar(64)  not null          comment '主键ID',
    account            varchar(64)  not null            comment '账号',
    password            varchar(128)  not null            comment '密码',   
    fullname             varchar(64)  not null            comment '全名',
    isadmin               varchar(2)  not null  default '0'      comment '是否为超级管理员',
    eamil                varchar(64)             comment '邮箱',
    tel                  varchar(20)             comment '手机号',

    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (user_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户';






//角色：role
create table mx_role
{
    role_id          varchar(64)   not null           comment '主键ID',
    org_id           varchar(64)  not null                       comment '外键ID',  
    name             varchar(64)  not null                       comment '名称',
    status           varchar(2)  default '1'   not null          comment '状态:0待考虑是否可以操作，1可以操作， 2锁定，不能操作', 
    type             varchar(30)  not null  default '-1'          comment '角色类型：student：学生， teacher：老师  ，-1：其它未知',

    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (user_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色';






//角色的功能：role_app
create table mx_role_app
{
     role_app_id      varchar(64)   not null       comment '主键ID',
     role_id          varchar(64)   not null                         comment '外键ID',  
     app_id           varchar(64)   not null                         comment '外键ID',       
     status           varchar(2)  default '1'   not null          comment '状态:0未授权，不能使用，1已授权，可以使用', 

    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (role_app_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色的功能';




//菜单功能：app
create table mx_app
{
     app_id           varchar(64)    not null      comment '主键ID',
     name             varchar(130)   not null      comment '功能名',  
     isblank          varchar(1)   DEFAULT '0'     comment '0:不开子页面， 1：开子页面',
     domain           varchar(100)                 comment '主域名，如果为空则为当前域名',  
     href             varchar(270)                 comment '链接',       
     type             varchar(2)  default '0'   not null          comment '状态:0归属普通用户，1归属企业账户，2归属超级管理员', 
     position         varchar(2)  default '0'  comment  '所处位置：1主菜单， 2下拉',
    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (app_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='功能';



//子功能：app_funs
create table mx_app_funs
{
     fun_id           varchar(64)    not null      comment '主键ID',
     app_id           varchar(64)    not null      comment '外键ID',
     name             varchar(130)   not null      comment '功能名',  
     href              varchar(270)                 comment '路径',   

    isvalid         varchar(1)   DEFAULT '1'    comment '0:无效， 1：有效',
    creater         varchar(64)                 comment  '创建者',
    updater         varchar(64)                 comment  '更新者',
    create_time     datetime                    comment  '创建时间',
    update_time     datetime                    comment  '更新时间',
    remark          text                        comment  '备注', 

    primary key (fun_id)
}ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='子功能';




