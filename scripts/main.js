require.config({
    baseUrl: '/scripts',
    paths: {
        '_': 'underscore',
        'backbone': 'backbone'
    },
    shim: {
        '_': { exports: '_' },
        'backbone': {
            deps: ['_', 'jquery'],
            exports: 'Backbone'
        },
        'json2': { exports: 'JSON' }
    }
})

require(['jquery', '_', 'backbone', 'text!templates/index.html', 'handlebars'], function($, _, Backbone, IndexTemplate) {
    $(function() {

        var IndexView = Backbone.View.extend({
            template: Handlebars.compile(IndexTemplate),
            render: function() {
                this.$el.html(this.template({ title: 'Skeleboneless' }));
                return this;
            }
        });

        var AppRouter = Backbone.Router.extend({
            routes: { ':page': "handler" },
            handler: function(page) {
                var toUpperCase = function(str) { return str.charAt(0).toUpperCase() + str.slice(1); },
                    view;
                try { view = eval("new " + toUpperCase(page) + 'View();'); }
                catch (ex) { if (console && console.log) { console.log(ex); } }

                if (view) {
                    $('body').html(view.render().el);
                }
            }
        });


        var router = new AppRouter(),
            fragment = Backbone.history.fragment, view;

        Backbone.history.start({ root: '/' });

        router.navigate(fragment ? fragment : 'index', { replace: true });

        var view = new IndexView();
        $('body').html(view.render().el);
    });
});
