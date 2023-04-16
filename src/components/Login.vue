<template>
    <div id="login">
        <div style="flex: 3"></div>
        <div style="flex: 2; display: flex; flex-direction: column">
            <div style="flex: 2"></div>
            <div id="content">
                <div id="title">Login</div>
                <div style="display: flex; flex-direction: column; width: 65%; margin: 0 auto">
                    <div class="tips">账号</div>
                    <input class="input" placeholder="username">
                </div>
                <div style="display: flex; flex-direction: column; width: 65%; margin: 0 auto">
                    <div class="tips">密码</div>
                    <input class="input" placeholder="password" type="password">
                </div>
                <div style="display: flex; flex-direction: column; width: 65%; margin: 0 auto">
                    <button>登&nbsp;&nbsp;&nbsp;录</button>
                </div>
            </div>
            <div style="flex: 2"></div>
        </div>
        <div style="flex: 3"></div>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style scoped>
#login {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-image: url("/images/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 50%;
}

#content {
    flex: 5;
    background-color: rgba(120, 120, 120, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
}

#title {
    font-size: 48px;
    font-family: Tanugo糖果手写体-Light, fangsong;
    font-weight: bolder;
    margin-top: 96px;
    color: white;
}

.tips {
    width: 70%;
    font-size: large;
    font-family: Tanugo糖果手写体-Light, fangsong;
    font-weight: bolder;
    color: white;
    margin: 12px 0 6px;
}

.input {
    height: 100%;
    min-height: 24px;
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid white;
    background-color: rgba(210, 210, 210, 0.5);
    color: white;
    font-size: large;
}

.input:focus {
    outline: rgba(255, 255, 255, 0.5);
    border: 1px solid white;
}

::placeholder {
    color: rgba(255, 255, 255, 1);
}

button {
    width: 50%;
    margin: 48px auto 0;
    background-color: rgba(32, 195, 75, 0.8);
    padding: 12px 24px;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: large;
}
</style>