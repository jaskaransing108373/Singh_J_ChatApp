import ChatMessage from './components/TheMessageComponent.js';

(() => {
    const socket = io();

    function setUserId({ sID }) {
        console.log(sID);
        vm.socketID = sID;
    };

    function appendMessage(message) {
        vm.messages.push(message);
    };

    function DisconnectMessage() {
        console.log('a user has disconnected');
    };

    function AppendUser(member) {
        vm.members.push(member);
    };

    const vm = new Vue({
        data: {
            messages: [],
            nickname: '',
            socketID: '',
            message: '',
            members: []

        },

        methods: {
            dispatchMessage() {
                console.log('message shot fired');

                socket.emit('chat_message', {
                    content: this.message, name: this.nickname || 'anonymous'
                })
                this.message = '';
            },

            addNewMember() {
                console.log('a User joined the chat');

                socket.emit('userJoined', {
                    member: this.nickname
                })
            }
        },

        mounted: function () {
            console.log('vue has mounted');
        },
        components: {
            newmessage: ChatMessage

        }
    }).$mount('#app');
    socket.addEventListener('newUser', AppendUser);
    socket.addEventListener('disconnect', DisconnectMessage);

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('new_message', appendMessage);

    const loginPage = document.querySelector('.loginPage'),
        nicknameInput = document.querySelector('#nickname'),
        loginButton = document.querySelector('.nicknameButton');

    loginButton.addEventListener('click', function () {
        if (nicknameInput.value === '') {

            alert("You need to fill a Username")

        }
        else {
            console.log('new user has joined');

            loginPage.classList.add('hide');

            alert('Welcome, ' + nicknameInput.value);
        }
    });

    const UserBut = document.querySelector('.userDisplay'),
        UserNav = document.querySelector('.memberList');

    UserBut.addEventListener('click',
        function () {
            console.log('User nav Clicked');
            UserNav.classList.toggle('showNav');
        })
})();