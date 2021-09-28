$(function () {
    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repsw: function (value) {
            var psw = $('.reg_box [name = password]').val()
            if (psw !== value) {
                return '两次密码不一致！'
            }
        }
    })

    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#reg_form [name = username]').val(), password: $('#reg_form [name = password]').val() },
            function (res) {
                if (res.ststus !== 0)
                return layer.msg(res.message)
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            })
    })

    $('#login_form').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token',res.token)
                // location.href = '/html.index'
            }
        })
    })

})