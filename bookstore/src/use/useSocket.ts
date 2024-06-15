
const useSocket = (url: string) => {
    const baseUrl = 'ws://localhost:3002';
    const socket = new WebSocket(baseUrl);
    socket.onopen = () => {
        console.log('连接已打开');
    }
    socket.onmessage = ({ data }) => {
        console.log(data);
    }
    socket.onclose = () => {
        console.log('连接已关闭');
    }
    socket.onerror = (err) => {
        console.log(err);
    }

    const send = (socket: WebSocket, data: string) => {
        socket.send(data);
        console.log('已发送');
    }
    return { socket, send };
}

export default useSocket;