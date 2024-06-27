import { ElMessage } from "element-plus";

class mySocket<T> {
    static baseUrl: string = 'ws://localhost:3002'; // base URL
    url: string; // 路由地址
    timeout: number; // 心跳时间
    socket: WebSocket | null = null; // websocket实例
    isLink: boolean = false;
    sendServerInterval: any;
    acceptServerInterval: any;
    messageCallback: Function | null = null;

    constructor(url: string, timeout: number) {
        this.url = mySocket.baseUrl + url;
        this.timeout = timeout * 1000;
        this.initSocket();
    }

    /* 初始化函数 */
    initSocket() {
        // 创建websocket实例
        this.socket = new WebSocket(this.url);

        // 连接打开时的回调
        this.socket.onopen = () => {
            this.isLink = true;
            console.log('已连接服务器...');
            this.keepHeartBeat();
        }

        // 监听接收信息事件
        this.socket.onmessage = ({ data }) => {

            // 处理数据
            const { message } = JSON.parse(data);

            // 收到回应，重新跳动
            this.isLink = true;
            clearTimeout(this.sendServerInterval);
            if (!message) {
                ElMessage({
                    message: data.msg,
                    type: data.type
                })
                // 执行回调
                if (this.messageCallback) {
                    this.messageCallback();
                }
            }
            // 
            if (message) {
                console.log(message);
            }

            // 
            this.keepHeartBeat();

        }
        this.socket.onclose = () => {
            this.isLink = false;
            console.log('与服务器断开连接...');
        }
        this.socket.onerror = (err) => {
            console.error('@@', err);
        }
    }

    /* 信息更改后的回调 */
    onMessaged(callback: Function) {
        this.messageCallback = callback;
    }



    /* 发送信息 */
    send(msg: T) {
        clearTimeout(this.sendServerInterval);
        if (!this.isLink) {
            ElMessage({
                message: '与服务器断开连接...',
                type: 'warning'
            })
            return;
        }
        this.socket?.send(JSON.stringify(msg));
        // 重新跳动
        this.keepHeartBeat();
    }

    /* 保持连接 */
    keepHeartBeat() {
        if (this.socket == null || !this.isLink) {
            return;
        }
        this.sendServerInterval = setTimeout(() => {
            this.socket!.send(JSON.stringify({
                message: 'web...'
            }));
            this.isLink = false;
        }, this.timeout)
    }


}

export default mySocket;