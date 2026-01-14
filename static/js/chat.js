$(document).ready(function () {
    const nameInput = $('#name');

    function generateRandomName() {
        const adj = ['피곤한', '행복한', '졸린', '배고픈', '신난'];
        const ani = ['오리', '사자', '강아지', '고양이', '호랑이'];
        nameInput.val(adj[Math.floor(Math.random()*adj.length)] + ' ' + ani[Math.floor(Math.random()*ani.length)]);
    }

    generateRandomName();

    $('#refresh-name').click(generateRandomName);

    $('#ask a').click(function () {
        const name = nameInput.val();
        if (!name) return alert("닉네임 입력!");
        join(name);
        $('#ask').hide();
        $('#channel').show();
        $('#message').focus();
    });

    function join(name) {
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        const ws = new WebSocket(`${protocol}://${window.location.host}`);
        
        ws.onmessage = function (evt) {
            const data = JSON.parse(evt.data);
            const timeStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

            // 시간(time)이 bubble 내부 하단으로 이동
            const msgHtml = `
                <div class="msg-item">
                    <span class="user ${data.user === name ? 'self' : ''}">${data.user}</span>
                    <div class="bubble">
                        <span class="text">${data.message}</span>
                        <span class="time">${timeStr}</span>
                    </div>
                </div>
            `;
            
            $('#msgs').append(msgHtml);
            $('#msgs').scrollTop($('#msgs')[0].scrollHeight);
        };

        $('#channel form').submit(function (e) {
            e.preventDefault();
            const input = $('#message');
            if (input.val()) ws.send(JSON.stringify({ action: 'message', user: name, message: input.val() }));
            input.val('');
        });
    }
});