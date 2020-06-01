function main() {
    const socket = new WebSocket('ws://localhost:8080');
    const colorPicker = new iro.ColorPicker('#picker', {
        width: 320,
        color: '#FFFFFF',
    });

    colorPicker.on('color:change', color => {
        console.log(color.hexString);
        socket.send(color.hexString);
    });
}




main()