$(function(){
    $('#toRegist').on('click',function(){
        $('.login-box').hide();
        $('.regist-box').show();
    })
    $('#toLogin').on('click',function(){
        $('.regist-box').hide();
        $('.login-box').show();
    })
})

// 通过 form.verify() 函数为表单添加检验规则
// 将自定义的检验规则名填入对应的标签的lay-verify属性中
var form = layui.form;
form.verify(
    {
        // 自定义了一个叫 pwd 的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        
        // 校验两次密码是否一致的规则
        repwd: function(value){
            // 通过形参拿到的是确认密码框中的内容
            // 获取密码框的内容（通过属性选择器获取），判断是否一致
            var data = $('.regist-box [name=password]').val();
            console.log(value + " " + data);
            if(data !== value){
                return '两次密码不一致';
            }
        }
    }
)

$(function() {
    // 监听注册表单的提交事件
    $('#regist').on('submit',function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 调用接口发起注册用户请求
        var url = "api/reguser";
        var data = {username:$('.regist-box [name=username]').val(),
                password:$('.regist-box [name=password]').val()}
        $.post(url,data,function(res){
                if(res.status !== 0){
                    // layer.msg() : layui中的弹框 
                    return layer.msg(res.message);
                }
                console.log(res.message);
                // 注册成功之后模拟点击去登陆链接
                $('#toLogin').click(); 
            }
        )
    })
})

$(function() {
    // 监听登录表单的提交事件
    $('#login').submit(function (e) { 
        e.preventDefault();
        var url = "api/login";
        // 采用 serialize() 方法获取表单中的数据
        var data = {username:$('.login-box [name=username]').val(),
        password:$('.login-box [name=password]').val()}
        $.ajax({
            method: "POST",
            url: url,
            data: data,
            success: function (response) {
                if(response.status !== 0){
                    return layer.msg('登陆失败');
                }
                // 将登入成功得到的 token 字符串保存到本地存储
                localStorage.setItem('token',response.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        });
    });
})