/* 注意： 每次调用 $.get() 或 $.post() 或 $.ajax()
    的时候，会先调用 ajaxPerfilter 这个函数，
    在这个函数中，我们可以获取我们给Ajax提供的配置对象
*/

$.ajaxPrefilter(function(options) {
    // 在发起Ajax请求之前，统一拼接请求的根路径
    options.url = "http://api-breakingnews-web.itheima.net/"+options.url;
})