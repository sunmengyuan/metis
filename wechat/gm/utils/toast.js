module.exports = {
    show: (page, opts = {}) => {
        var opts = {
            message: opts.message || '未知错误',
            duration: opts.duration || 3000,
            type: opts.type || 'common'
        };
        switch (opts.type) {
            case 'common':
                page.setData({
                    'render.toast.show': true,
                    'render.toast.message': opts.message
                });
                let t = setTimeout(() => {
                    page.setData({
                        'render.toast.show': false,
                        'render.toast.message': ''
                    });
                }, opts.duration);
                break;
            case 'loading':
                wx.showToast({
                    title: opts.message,
                    duration: opts.duration,
                    icon: 'loading'
                });
                break;
            case 'success':
                wx.showToast({
                    title: opts.message,
                    duration: opts.duration,
                    icon: 'success'
                });
                break;
        }
    }
}
