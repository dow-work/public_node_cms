var gPath = '';
var gDepthTree = '';
var gDepthMenu = '';

var view_template = '';
var view_name = '';
var view_param = '';

exports.connection = function (name, req, res) {

    if (req.session.uid) {
        console.log("Name : "+name+" Comapy : "+req.session.company+" Store :"+req.session.store);
        view_name = name;
        view_template = '';
        view_param = '';
        if(name=='customer'){
            gPath = '';
            view_template = MENU_CLICK_PLZ;//
            gDepthTree = CUSTOMER_CMS_TREE;
            gDepthMenu = CUSTOMER_CMS_MENU;

        }else{
            require('../view_template.js');
            if(name.split('_')[0] == 'user'){
                gDepthTree = CUSTOMER_USER_MANAGER;
                if(name.split('_')[1] == 'register'){
                    view_template = USER_REGISTER;
                    gDepthMenu = CUSTOMER_USER_REGISTER;
                }else if(name.split('_')[1] == 'list'){
                    view_template = USER_LIST;
                    gDepthMenu = CUSTOMER_USER_LIST;
                }else {
                    console.log("EDIT p UserId"+req.param('userid'));
                    view_param = req.param('userid');
                    view_template = USER_EDIT;
                    gDepthMenu = CUSTOMER_USER_EDIT
                }
            }else{
                gDepthTree = CUSTOMER_DATA_MANAGER;
                if(name.split('_')[1] == 'register'){
                    view_template = DATA_REGISTER;
                    gDepthMenu = CUSTOMER_DATA_REGISTER;
                }else if(name.split('_')[1] == 'list'){
                    view_template = DATA_LIST;
                    gDepthMenu = CUSTOMER_DATA_LIST;
                }else{

                }
            }

            // console.log('readJS : '+view_template);
        }


        res.render('customer', {
            gRoot: global.gRoot,
            gUserId: req.session.uid,
            gUserStatus: req.session.status,
            gViewName:view_name,
            gTree : gDepthTree,
            gMenu : gDepthMenu,
            gCompany : req.session.company,
            gStore : req.session.store,
            bindingData: view_template,
            bindingParam: view_param
        });

        return;
    }
    res.render('login', {gRoot: global.gRoot});
}
