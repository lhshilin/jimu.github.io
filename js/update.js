$(function () {
    window.togglePrompt = function (key, element) {
        if(key) {
            $(element).stop().fadeIn(500)
            $('body > .cover').show()
            $('body').css('overflow', 'hidden')
        } else {
            $(element).stop().fadeOut(500)
            $('body > .cover').hide()
            if($('#homepage .cover').css('display') == 'none') $('body').css('overflow', 'visible');
        }
    }
    $('body .cover').on('click', function () {
        togglePrompt(false, '.prompt')
    })
    // 当前版本信息写入
    var version = '2023.03.20.0',
        sourceCodeUrl = 'https://lhshilin.github.io/jimu/download/积木' + version + '版本源码.zip',
        androidUrl = 'https://lhshilin.github.io/jimu/download/积木_' + version + '.apk';
    $('#sourceCodeDownload').attr('data-clipboard-text', sourceCodeUrl)
    $('#sourceCode a').attr({
        href : sourceCodeUrl,
        download : '积木' + version + '版本源码.zip'
    })
    $('#androidDownload').attr('data-clipboard-text', androidUrl)
    $('#android a').attr({
        href : androidUrl,
        download : '积木_' + version + '.apk'
    })
    // 下次不提示更新本地存储数据
    if(!localStorage.getItem('updateTip')) {
        localStorage.setItem('updateTip', 'true')
    }
    // 判断最新版本
    axios.get('https://lhshilin.github.io/jimu/update.json').then((res) => {
        res = res.data;
        function showUpdate() {
            $('.sidebar .about .checkUpdateBtn').html('有新版本').css('color', '#f40')
            togglePrompt(true, '.update')
        }
        if(version === res.updateV) {
            $('.sidebar .about .checkUpdateBtn').html('已最新版本')
        }else if(localStorage.getItem('updateTip') == 'true' || localStorage.getItem('updateV') !== res.updateV) {
            showUpdate()
        } else {
            $('.sidebar .about .checkUpdateBtn').on('click', showUpdate)
        }
        var updateAndroidUrl = 'https://lhshilin.github.io/jimu/download/积木_' + res.updateV + '.apk';
        $('.update .androidUrl a').prop('href', updateAndroidUrl).children('span').html(updateAndroidUrl)
        $('.update button:eq(0)').on('click', function () {
            togglePrompt(false, '.update')
            localStorage.setItem('updateTip', 'false')
            localStorage.setItem('updateV', res.updateV)
        })
        $('.update button:eq(1)').on('click', function () {
            window.location.href = 'https://lhshilin.lanzoui.com/b0176d1pe';
        })
        $('.update button:eq(2)').on('click', function () {
            window.location.href = updateAndroidUrl;
        })
    }).catch((err) => {
        console.log(err.response.data)
    })
})