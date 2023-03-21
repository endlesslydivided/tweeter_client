import { AndroidFilled, AppleFilled, DesktopOutlined, PhoneFilled, WindowsFilled } from "@ant-design/icons";

export const os = [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS', icon:<WindowsFilled/> },
    { name: 'Windows', value: 'Win', version: 'NT', icon:<WindowsFilled/>  },
    { name: 'iPhone', value: 'iPhone', version: 'OS', icon:<AppleFilled/>  },
    { name: 'iPad', value: 'iPad', version: 'OS', icon:<AppleFilled/>  },
    { name: 'Kindle', value: 'Silk', version: 'Silk', icon:<PhoneFilled/>  },
    { name: 'Android', value: 'Android', version: 'Android', icon:<AndroidFilled/>  },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS', icon:<PhoneFilled/>  },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/', icon:<PhoneFilled/>  },
    { name: 'Macintosh', value: 'Mac', version: 'OS X', icon:<AppleFilled/>  },
    { name: 'Linux', value: 'Linux', version: 'rv', icon:<DesktopOutlined/>  },
    { name: 'Palm', value: 'Palm', version: 'PalmOS', icon:<DesktopOutlined/> }
]

export const browser = [
    { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
    { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
    { name: 'Safari', value: 'Safari', version: 'Version' },
    { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
    { name: 'Opera', value: 'Opera', version: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
]

export const  matchUserAgent = (string:any, data:any)  =>
{
    var i = 0, j = 0,html = '',regex,regexv,match,matches,version;    
    for (i = 0; i < data.length; i += 1) 
    {
        regex = new RegExp(data[i].value, 'i');
        match = regex.test(string);
        if (match) 
        {
            regexv = new RegExp(data[i].version + '[- /:;]([\d._]+)', 'i');
            matches = string.match(regexv);
            version = '';

            if (matches) 
            { 
                if (matches[1]) 
                { 
                    matches = matches[1]; 
                } 
            }

            if (matches) 
            {
                matches = matches.split(/[._]+/);
                for (j = 0; j < matches.length; j += 1) 
                {
                    if (j === 0) 
                    {
                        version += matches[j] + '.';
                    } else 
                    {
                        version += matches[j];
                    }
                }
            } 
            else 
            {
                version = '0';
            }
            return{
                icon:data[i].icon,
                name: data[i].name,
                version: parseFloat(version)
            };
        }
    }
    return { name: 'unknown', version: 0 };
}