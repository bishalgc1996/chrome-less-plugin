if (ssInitialValue != null) {
	var currencyObject=null;
	var getQueryparams = (name) => {
				let referrer = document.referrer;
				let urlArr = referrer.split("?");
				if (urlArr.length > 1) {
					let queryParams = urlArr[1].split("&");
					let value = queryParams.find((r) => r.indexOf(name) > -1)?.split(name + "=")[1];
					if (value) return value;
				}console.log(name,"name of parameter");
				throw "No params found";
	};
					
	(function ($) {
					$.ajax({
					beforeSend:function(a){
						//add spinner
						//$this.attr('disabled','true');
					},
		  url: "https://www.epoints.com/rest/countries",
		  type: "GET",
		  async:false,
		  success: function (result) {
			  let countryCode = getQueryparams('countryCode')
		      currencyObject = result.find(r=>r.code.toLowerCase()===countryCode.toLowerCase()) 
			   
		  },
		  error: function (error) {
			console.log(error);
		  },complete:function(a){
			 //remove spinner
		  }
		  });
		
        const totalLimit = getQueryparams("totalLimit");
        const maxLimit = getQueryparams("maxLimit");
        const itemDetail = JSON.parse(
            items.replaceAll("\\u0000*\\u0000", "").replaceAll("<br>", "")
        );
		const redemptionItems = JSON.parse(redemptionItemInfo);
        console.log(itemDetail);
        const imgSrc = $(
            ".chrome-less-reward .woocommerce-product-gallery__image .wp-post-image"
        ).attr("src");

        console.log(document.body.classList.contains("single-product"));

        if (document.body.classList.contains("single-product")) {
            // parentDOM.parentNode.insertBefore(newElement, element.nextSibling);

            /*g = document.createElement("button");
            gl = document.createElement("div");

            g.setAttribute("id", "chromeless-reward");

            gl.setAttribute("id", "chromeless-reward-quantity-wrapper");
            gl.setAttribute("class", "chromeless-reward-quantity-class");

            console.log(g);
            console.log(gl);

            // and give it some content
            //const newContent = document.createTextNode("Add Reward");

            // add the text node to the newly created div
            g.appendChild(newContent);

            // add the newly created element and its content into the DOM
            const currentDiv = document.getElementById("chromeless-reward");

            const currentdivNew = document.getElementById("shop-now");

            document.body.insertBefore(g, currentDiv);
			*/
            // Cart Functionality

            //const clBtn = document.getElementById("chromeless-reward");
            $("#tbay-header").append(`<div class="gren-border">
    <span class="epoints-price-text epoints-price-price epoints-price-text-small font-styleRegular" automation-id="epoints-price-price">You have `+currencyObject.currency+`<span id="cl-hb-price"> ${(maxLimit/(currencyObject.conversionRate || 1 * 200)).toFixed(2)} </span> </span><span class="ep-dots"> • </span>
     <span class="epoints-points-in-nums font-weight-bold"> <img src="https://qa-shop.eachperson.com/wp-content/themes/besa-child/assets/img/elogo-rebrand-small.png" class="epoints-logo-rebranded" width="14px"> <span  id="cl-epoints-price">${maxLimit}</span></span>
 <span> to use due to the reason selected.</span>
    </div>
   </div>
   <div class="red-border"><span id="warning-limit"></span></div>
   <button onclick="history.back()" class="flyback">Back</button><div class="cl-icon-quantity">
   <a  id="cl-minus-icon"  >-</a>
   <div id="product-quantity-cl" class="quantity">1</div>
   <a id="cl-plus-icon">+</a>
   
   </div>`);
            let itemDynamicHtml = `<div class="row">
            <div class="items-image-text-binder">
            <div class="items-image-wrapper">
                <div class="items-img">
                  <img _ngcontent-ieg-c154="" width="80px" height="50px" src="<<image_url>>" />
                </div>
                <button id='bt_<<id>>' class="flydel"><i class="tb-icon tb-icon-zt-delete"></i></button>
              </div>
            <div class="cl-flyout-text-wrapper">
              <div class="cl-flyout-product-title">
              <p id="cl-flyout-title-id" class="cl-flyout-product-title-element"><<name>>
                <span class="quant">X: <<quantity>></span>
              </p>
              </div>
              <div class="price-block">
              <span id="cl-flyout-price-id" class="flyprice">Price: <<price>>
              </span>
              </div>
            </div>
            </div>
          `;
            let toggleFlyOver = (show) => {
                let displayCss = "none";
                if (show) displayCss = "block";
                $("#flyout-cl").css("display", displayCss);
                $(".basket-red").css("display", displayCss);
            };
            //intially check localstorage
            $("#tbay-header").append(`<div class="basket-red">
    <div id="cl-cart-wrapper" class="block relative h-9 basket-new-icon-mobile"><svg width="30px" height="34px" viewBox="0 0 30 34"
        version="1.1" class="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Transition-Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Screen-/-Transition-Elements-/-Desk-Tablet-Mobile" transform="translate(-742.000000, -197.000000)"
            stroke="#4A4A4A" stroke-width="1.2">
            <g id="Components-/-Global-/-Header-/-Tablet-/-Full" transform="translate(69.000000, 186.000000)">
              <g id="Particles-/-Icons-/-Active-/-Bag-Full" transform="translate(670.000000, 10.000000)">
                <g id="Group" transform="translate(4.235294, 2.000000)">
                  <path
                    d="M5.19866476,8 L22.3304427,8 C23.8468134,8 25.1247636,9.1315378 25.3083699,10.6367516 L27.5040147,28.6367516 C27.7046313,30.2814154 26.5339997,31.7773107 24.8893359,31.9779272 C24.7688113,31.9926289 24.6475054,32 24.5260875,32 L3.00301996,32 C1.34616571,32 0.00301995682,30.6568542 0.00301995682,29 C0.00301995682,28.8785821 0.0103911029,28.7572762 0.0250927197,28.6367516 L2.22073752,10.6367516 C2.40434391,9.1315378 3.68229409,8 5.19866476,8 Z"
                    id="kwadrat" fill="#FFFFFF" stroke-linecap="round"></path>
                  <path
                    d="M20.6470588,7 L6.88235294,7 C6.88235294,3.13400673 9.96368735,0 13.7647059,0 C17.5657244,0 20.6470588,3.13400673 20.6470588,7 Z"
                    id="kolko"></path>
                  <g id="kreski" transform="translate(6.882353, 7.000000)" stroke-linecap="round">
                    <path d="M0.458823529,0 L0.458823529,5 M13.3058824,0 L13.3058824,5" id="Shape"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg><span
        class="product-quantity absolute pin-r pin-l text-center text-black-lightest text-sm font-semibold mt-3"
        style="top: 0px; height: 19px; line-height: 19px;"> <a  id="cartAmount" class="cartAmount">0
        </a></span></div>
    </div>`); 
            let resolveFlyOver = () => {
                let assignedItems = "";
                let initItm = JSON.parse(localStorage.getItem("data") || "{}");
                Object.keys(initItm).forEach((elm, i) => {
                    assignedItems += itemDynamicHtml
                        .replace("<<image_url>>", initItm[elm].imgUrl)
                        .replace("<<id>>", elm)
                        .replace("<<quantity>>", initItm[elm].quantity)
                        .replace("<<name>>", initItm[elm].name)
                        .replace("<<price>>", initItm[elm].price * initItm[elm].quantity);
                });
                $("#flyout-cl").remove();
                $("#main-wrapper").append(
                    `<div id="flyout-cl" class="flyout-binder">
      <div class="flyout-wrapper">
        <div class="flyout-header">
        <div class="cursor-pointer" data-testid="flyout-cross">
        <p class="exes">
        <a href="javascript:;" class="offcanvas-close"><i id="cl-close-icon" class="tb-icon tb-icon-cross"></i></a>
        </div>
        </div>
        <div class="flyout-items check">
           ` +
          assignedItems +
          `
        </div>
        <div class="flyout-footer">
          <div class="flyout-footer-btns-binder">
            <div class="shopping-btn">
  
              <button onclick="history.back()" id="cl-add-more-btn" class="buttn buttn-text font-styleRegular undefined bg-eco-black text-white"
                style="width: 100%;">Add
                more</button>
            </div>
            <div class="cl-confirm-btn">
              <button type="submit" id="cl-confirm-btn" name="confirm-btn" value="" class="window-popup-confirm-btn">Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`
                );
                toggleFlyOver(true);
            };
            resolveFlyOver();
            let getLocalItem = () => JSON.parse(localStorage.getItem("data") || "{}");
            let setLocalItem = (data) =>
                localStorage.setItem("data", JSON.stringify(data));
            let incDecr = (incr) => {
                let data = getLocalItem();
                if (!Object.keys(data).length || !data[productId]) {
                    data[productId] = {
                        quantity: 0,
                        imgUrl: imgSrc,
                        price: productPrice,
                        name: productName,
                    };
                }
                let val = data[productId]["quantity"] || 0; //get value from
                if (incr !== undefined) {
                    if (incr) val++;
                    else val--;
                }
                data[productId]["quantity"] = val;
                let currentLimit = Object.keys(data)
                    .map((r) => data[r].price * currencyObject.conversionRate * data[r].quantity * 200)
                    .reduce((a, b) => a + b, 0);

                function updateEpoints() {

                    const epointsText = document.getElementById('cl-epoints-price');
                    const clepPrice = document.getElementById('cl-hb-price');

                    if (incr) {
                        epointsText.innerText = (maxLimit) - currentLimit
                        clepPrice.innerText = (((maxLimit) - currentLimit)  / 200)
                    }
                    else if (incr === false) {

                        const clepQuantity = document.getElementById('product-quantity-cl');

                        console.log(clepQuantity.innerText)

                        tempmaxLimit = Number(maxLimit) - currentLimit


                        console.log(tempmaxLimit)
                        const clepminusIcon = document.getElementById('cl-minus-icon');

                        tempclPrice = ((Number(maxLimit) - currentLimit) / 200)

                        if (currentLimit >= 0 && clepQuantity.innerText > 0 ) {
                            epointsText.innerText = tempmaxLimit
                            clepPrice.innerText = tempclPrice
                        }

                    }

                    else if (incr === undefined) {
                        epointsText.innerText = (maxLimit) - currentLimit
                        clepPrice.innerText = (((maxLimit) - currentLimit)  / 200)
                    }
                    else {
                        epointsText.innerText = maxLimit
                        clepPrice.innerText = ((maxLimit)  / 200)
                    }

                }

                updateEpoints();

                let warningText = "";
                if (currentLimit > maxLimit)
                    //warningText = `Oops...${currentLimit} > ${maxLimit}`;
                    warningText = ` The product/item selected now exceeds the amount available `;
                $("#warning-limit").text(warningText);

                if (data[productId]["quantity"] <= 0) {
                    delete data[productId];
                    $("#product-quantity-cl").text("0");
                    //$("#cartAmount").text("0");
                } else {
                    $("#product-quantity-cl").text(data[productId]["quantity"]);
                    //$("#cartAmount").text(data[productId]["quantity"]);
                }
				
				if (Object.keys(data).length != 0){
					var bucket = Object.keys(data).length;
					$('#cartAmount').text(bucket);
				} else {
					$('#cartAmount').text("0");
				}
                setLocalItem(data);
                resolveFlyOver();
            };
            $(document).on("click", "#cl-plus-icon", function (a) {
                incDecr(true);
            });
            $(document).on("click", "#cl-minus-icon", function (a) {
                incDecr(false);
            });
            $(document).on("click", '[id^="bt_"]', function (a) {
                let pId = $(this).attr("id").replace("bt_", "");
                let data = getLocalItem();
                delete data[pId];
                if (pId === productId) {
                    $("#product-quantity-cl").text("0");
                    $("#cartAmount").text("0");
                }
                setLocalItem(data);
                //resolveFlyOver();
                incDecr(undefined);
            });

            $(document).on("click", "#cl-confirm-btn", function (a) {
				 
				$(this).attr('disabled','true');
				 
		      let rate=	currencyObject?.conversionRate;
			  if(!rate)
			  {			  
			  $(this).attr("disabled", false);
			  throw 'No rate found'
			  ;}
                let data = getLocalItem();

                let payLoadArr = [];
                Object.keys(data).forEach((id, i) => {
                    let finalPayLoad = {};
                    finalPayLoad["quantity"] = data[id].quantity;
                    finalPayLoad["productTitle"] = data[id].name;
                    finalPayLoad["imageUrl"] = data[id].imgUrl;
                    finalPayLoad["productId"] = id;
                    finalPayLoad["amountInEpoints"] = Number(data[id].price) * 200 * rate;
                    finalPayLoad["amountInCurrency"] = data[id].price * rate;
			  		finalPayLoad["productDetail"] = redemptionItems;
			        finalPayLoad["giftCard"] = detectgiftCard;
                    payLoadArr.push(finalPayLoad);
                });

                window.opener.postMessage(payLoadArr, "*");
                localStorage.removeItem("data");
                window.close();
		   
		
                
            });

            incDecr(undefined);
			$(document).ready(function(){
				$('.basket-red').click(function(){
			  		$('#flyout-cl').show();
			    });  
			  	$('#cl-close-icon').click(function(){
			  		$('#flyout-cl').hide();
			    });
			});
			$(document).ready(function(){
                ['.group-buttons','#sticky-menu-bar','#tbay-footer','.tbay-woocommerce-breadcrumb','#product-related'].forEach((el,i)=>$('body.chrome-less-reward '+el).remove());
            });
        }
    })(jQuery);
}
