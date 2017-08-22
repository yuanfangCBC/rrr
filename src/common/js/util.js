export function checkPhone(num){
    if(!(/^1[34578]\d{9}$/.test(num))){ 
        //alert("手机号码有误，请重填");  
        return false; 
    }else{
        return true;
    }
}
export function getClientHeight()
{
  var clientHeight=0;
  if(document.body.clientHeight&&document.documentElement.clientHeight)
  {
  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  else
  {
  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  return clientHeight;
}
