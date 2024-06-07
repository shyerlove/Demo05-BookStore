type user = {
    id: string,
    name: string,
    username: string,
    role: '管理员' | '用户',
    phone: string,
    sex: '男' | '女',
    isBlack: 0 | 1
}

export default user;