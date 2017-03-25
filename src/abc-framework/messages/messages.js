import { defineMessages }              from 'react-intl'
const messages = defineMessages
({
    user:{
        title:
        {
            id             : 'user.title',
            description    : '用户主页，包括用户的增删改查，权限的增删改查，用户图像的修改，后端存储采用mysql',
            defaultMessage : '用户管理'
        },
        subTitle:
        {
            id             : 'user.subTitle',
            description    : '首页子标题',
            defaultMessage : '用户维护信息'
        }
   },

    authentication:{
        title:
            {
                id             : 'authentication.title',
                description    : '权限主页，包括权限的增删改查，权限的增删改查，用户图像的修改，后端存储采用mysql',
                defaultMessage : '权限管理'
            },
            subTitle:
            {
                id             : 'authentication.subTitle',
                description    : '权限子标题',
                defaultMessage : '权限维护信息'
            }
        },

    producmanager:{
        title:
        {
            id             : 'authentication.title',
            description    : '商品主页，包括商品的增删改查，商品的增删改查，商品图像的修改，后端存储采用mysql',
            defaultMessage : '商品管理'
        },
        subTitle:
        {
            id             : 'authentication.subTitle',
            description    : '商品管理',
            defaultMessage : '商品信息'
        }
    },
    produclist:{
        title:
        {
            id             : 'authentication.title',
            description    : '商品展现，包括商品的增删改查，商品的增删改查，商品图像的修改，后端存储采用mysql',
            defaultMessage : '商品上架'
        },
        subTitle:
        {
            id             : 'authentication.subTitle',
            description    : '商品列表',
            defaultMessage : '商品信息'
        }
    },
    }
)

export default messages
