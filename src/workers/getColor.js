"use strict";(()=>{var Ce=Object.defineProperty;var oe=Object.getOwnPropertySymbols;var xe=Object.prototype.hasOwnProperty,Ae=Object.prototype.propertyIsEnumerable;var qt=(e,t,r)=>t in e?Ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,at=(e,t)=>{for(var r in t||(t={}))xe.call(t,r)&&qt(e,r,t[r]);if(oe)for(var r of oe(t))Ae.call(t,r)&&qt(e,r,t[r]);return e};var _t=(e,t,r)=>qt(e,typeof t!="symbol"?t+"":t,r);function L(e){return e<0?-1:e===0?0:1}function nt(e,t,r){return(1-r)*e+r*t}function ae(e,t,r){return r<e?e:r>t?t:r}function st(e,t,r){return r<e?e:r>t?t:r}function Mt(e){return e=e%360,e<0&&(e=e+360),e}function _(e){return e=e%360,e<0&&(e=e+360),e}function se(e,t){return _(t-e)<=180?1:-1}function It(e,t){return 180-Math.abs(Math.abs(e-t)-180)}function mt(e,t){let r=e[0]*t[0][0]+e[1]*t[0][1]+e[2]*t[0][2],n=e[0]*t[1][0]+e[1]*t[1][1]+e[2]*t[1][2],o=e[0]*t[2][0]+e[1]*t[2][1]+e[2]*t[2][2];return[r,n,o]}var ie=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],ke=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],$t=[95.047,100,108.883];function gt(e,t,r){return(255<<24|(e&255)<<16|(t&255)<<8|r&255)>>>0}function Yt(e){let t=ot(e[0]),r=ot(e[1]),n=ot(e[2]);return gt(t,r,n)}function ce(e){return e>>24&255}function it(e){return e>>16&255}function ct(e){return e>>8&255}function lt(e){return e&255}function jt(e,t,r){let n=ke,o=n[0][0]*e+n[0][1]*t+n[0][2]*r,a=n[1][0]*e+n[1][1]*t+n[1][2]*r,i=n[2][0]*e+n[2][1]*t+n[2][2]*r,c=ot(o),l=ot(a),m=ot(i);return gt(c,l,m)}function Me(e){let t=Z(it(e)),r=Z(ct(e)),n=Z(lt(e));return mt([t,r,n],ie)}function le(e,t,r){let n=$t,o=(e+16)/116,a=t/500+o,i=o-r/200,c=Tt(a),l=Tt(o),m=Tt(i),h=c*n[0],f=l*n[1],y=m*n[2];return jt(h,f,y)}function Kt(e){let t=Z(it(e)),r=Z(ct(e)),n=Z(lt(e)),o=ie,a=o[0][0]*t+o[0][1]*r+o[0][2]*n,i=o[1][0]*t+o[1][1]*r+o[1][2]*n,c=o[2][0]*t+o[2][1]*r+o[2][2]*n,l=$t,m=a/l[0],h=i/l[1],f=c/l[2],y=ft(m),u=ft(h),d=ft(f),p=116*u-16,x=500*(y-u),I=200*(u-d);return[p,x,I]}function he(e){let t=j(e),r=ot(t);return gt(r,r,r)}function pt(e){let t=Me(e)[1];return 116*ft(t/100)-16}function j(e){return 100*Tt((e+16)/116)}function dt(e){return ft(e/100)*116-16}function Z(e){let t=e/255;return t<=.040449936?t/12.92*100:Math.pow((t+.055)/1.055,2.4)*100}function ot(e){let t=e/100,r=0;return t<=.0031308?r=t*12.92:r=1.055*Math.pow(t,1/2.4)-.055,ae(0,255,Math.round(r*255))}function ue(){return $t}function ft(e){let t=.008856451679035631,r=24389/27;return e>t?Math.pow(e,1/3):(r*e+16)/116}function Tt(e){let t=.008856451679035631,r=24389/27,n=e*e*e;return n>t?n:(116*e-16)/r}var $=class e{static make(t=ue(),r=200/Math.PI*j(50)/100,n=50,o=2,a=!1){let i=t,c=i[0]*.401288+i[1]*.650173+i[2]*-.051461,l=i[0]*-.250268+i[1]*1.204414+i[2]*.045854,m=i[0]*-.002079+i[1]*.048952+i[2]*.953127,h=.8+o/10,f=h>=.9?nt(.59,.69,(h-.9)*10):nt(.525,.59,(h-.8)*10),y=a?1:h*(1-1/3.6*Math.exp((-r-42)/92));y=y>1?1:y<0?0:y;let u=h,d=[y*(100/c)+1-y,y*(100/l)+1-y,y*(100/m)+1-y],p=1/(5*r+1),x=p*p*p*p,I=1-x,g=x*r+.1*I*I*Math.cbrt(5*r),b=j(n)/t[1],D=1.48+Math.sqrt(b),M=.725/Math.pow(b,.2),B=M,P=[Math.pow(g*d[0]*c/100,.42),Math.pow(g*d[1]*l/100,.42),Math.pow(g*d[2]*m/100,.42)],k=[400*P[0]/(P[0]+27.13),400*P[1]/(P[1]+27.13),400*P[2]/(P[2]+27.13)],S=(2*k[0]+k[1]+.05*k[2])*M;return new e(b,S,M,B,f,u,d,g,Math.pow(g,.25),D)}constructor(t,r,n,o,a,i,c,l,m,h){this.n=t,this.aw=r,this.nbb=n,this.ncb=o,this.c=a,this.nc=i,this.rgbD=c,this.fl=l,this.fLRoot=m,this.z=h}};$.DEFAULT=$.make();var N=class e{constructor(t,r,n,o,a,i,c,l,m){this.hue=t,this.chroma=r,this.j=n,this.q=o,this.m=a,this.s=i,this.jstar=c,this.astar=l,this.bstar=m}distance(t){let r=this.jstar-t.jstar,n=this.astar-t.astar,o=this.bstar-t.bstar,a=Math.sqrt(r*r+n*n+o*o);return 1.41*Math.pow(a,.63)}static fromInt(t){return e.fromIntInViewingConditions(t,$.DEFAULT)}static fromIntInViewingConditions(t,r){let n=(t&16711680)>>16,o=(t&65280)>>8,a=t&255,i=Z(n),c=Z(o),l=Z(a),m=.41233895*i+.35762064*c+.18051042*l,h=.2126*i+.7152*c+.0722*l,f=.01932141*i+.11916382*c+.95034478*l,y=.401288*m+.650173*h-.051461*f,u=-.250268*m+1.204414*h+.045854*f,d=-.002079*m+.048952*h+.953127*f,p=r.rgbD[0]*y,x=r.rgbD[1]*u,I=r.rgbD[2]*d,g=Math.pow(r.fl*Math.abs(p)/100,.42),b=Math.pow(r.fl*Math.abs(x)/100,.42),D=Math.pow(r.fl*Math.abs(I)/100,.42),M=L(p)*400*g/(g+27.13),B=L(x)*400*b/(b+27.13),P=L(I)*400*D/(D+27.13),k=(11*M+-12*B+P)/11,S=(M+B-2*P)/9,w=(20*M+20*B+21*P)/20,V=(40*M+20*B+P)/20,q=Math.atan2(S,k)*180/Math.PI,O=q<0?q+360:q>=360?q-360:q,rt=O*Math.PI/180,xt=V*r.nbb,et=100*Math.pow(xt/r.aw,r.c*r.z),At=4/r.c*Math.sqrt(et/100)*(r.aw+4)*r.fLRoot,zt=O<20.14?O+360:O,Nt=.25*(Math.cos(zt*Math.PI/180+2)+3.8),Gt=5e4/13*Nt*r.nc*r.ncb*Math.sqrt(k*k+S*S)/(w+.305),kt=Math.pow(Gt,.9)*Math.pow(1.64-Math.pow(.29,r.n),.73),ee=kt*Math.sqrt(et/100),re=ee*r.fLRoot,de=50*Math.sqrt(kt*r.c/(r.aw+4)),ye=(1+100*.007)*et/(1+.007*et),ne=1/.0228*Math.log(1+.0228*re),be=ne*Math.cos(rt),Pe=ne*Math.sin(rt);return new e(O,ee,et,At,re,de,ye,be,Pe)}static fromJch(t,r,n){return e.fromJchInViewingConditions(t,r,n,$.DEFAULT)}static fromJchInViewingConditions(t,r,n,o){let a=4/o.c*Math.sqrt(t/100)*(o.aw+4)*o.fLRoot,i=r*o.fLRoot,c=r/Math.sqrt(t/100),l=50*Math.sqrt(c*o.c/(o.aw+4)),m=n*Math.PI/180,h=(1+100*.007)*t/(1+.007*t),f=1/.0228*Math.log(1+.0228*i),y=f*Math.cos(m),u=f*Math.sin(m);return new e(n,r,t,a,i,l,h,y,u)}static fromUcs(t,r,n){return e.fromUcsInViewingConditions(t,r,n,$.DEFAULT)}static fromUcsInViewingConditions(t,r,n,o){let a=r,i=n,c=Math.sqrt(a*a+i*i),m=(Math.exp(c*.0228)-1)/.0228/o.fLRoot,h=Math.atan2(i,a)*(180/Math.PI);h<0&&(h+=360);let f=t/(1-(t-100)*.007);return e.fromJchInViewingConditions(f,m,h,o)}toInt(){return this.viewed($.DEFAULT)}viewed(t){let r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(r/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),o=this.hue*Math.PI/180,a=.25*(Math.cos(o+2)+3.8),i=t.aw*Math.pow(this.j/100,1/t.c/t.z),c=a*(5e4/13)*t.nc*t.ncb,l=i/t.nbb,m=Math.sin(o),h=Math.cos(o),f=23*(l+.305)*n/(23*c+11*n*h+108*n*m),y=f*h,u=f*m,d=(460*l+451*y+288*u)/1403,p=(460*l-891*y-261*u)/1403,x=(460*l-220*y-6300*u)/1403,I=Math.max(0,27.13*Math.abs(d)/(400-Math.abs(d))),g=L(d)*(100/t.fl)*Math.pow(I,1/.42),b=Math.max(0,27.13*Math.abs(p)/(400-Math.abs(p))),D=L(p)*(100/t.fl)*Math.pow(b,1/.42),M=Math.max(0,27.13*Math.abs(x)/(400-Math.abs(x))),B=L(x)*(100/t.fl)*Math.pow(M,1/.42),P=g/t.rgbD[0],k=D/t.rgbD[1],S=B/t.rgbD[2],w=1.86206786*P-1.01125463*k+.14918677*S,V=.38752654*P+.62144744*k-.00897398*S,Y=-.0158415*P-.03412294*k+1.04996444*S;return jt(w,V,Y)}static fromXyzInViewingConditions(t,r,n,o){let a=.401288*t+.650173*r-.051461*n,i=-.250268*t+1.204414*r+.045854*n,c=-.002079*t+.048952*r+.953127*n,l=o.rgbD[0]*a,m=o.rgbD[1]*i,h=o.rgbD[2]*c,f=Math.pow(o.fl*Math.abs(l)/100,.42),y=Math.pow(o.fl*Math.abs(m)/100,.42),u=Math.pow(o.fl*Math.abs(h)/100,.42),d=L(l)*400*f/(f+27.13),p=L(m)*400*y/(y+27.13),x=L(h)*400*u/(u+27.13),I=(11*d+-12*p+x)/11,g=(d+p-2*x)/9,b=(20*d+20*p+21*x)/20,D=(40*d+20*p+x)/20,B=Math.atan2(g,I)*180/Math.PI,P=B<0?B+360:B>=360?B-360:B,k=P*Math.PI/180,S=D*o.nbb,w=100*Math.pow(S/o.aw,o.c*o.z),V=4/o.c*Math.sqrt(w/100)*(o.aw+4)*o.fLRoot,Y=P<20.14?P+360:P,q=1/4*(Math.cos(Y*Math.PI/180+2)+3.8),rt=5e4/13*q*o.nc*o.ncb*Math.sqrt(I*I+g*g)/(b+.305),xt=Math.pow(rt,.9)*Math.pow(1.64-Math.pow(.29,o.n),.73),et=xt*Math.sqrt(w/100),At=et*o.fLRoot,zt=50*Math.sqrt(xt*o.c/(o.aw+4)),Nt=(1+100*.007)*w/(1+.007*w),Ut=Math.log(1+.0228*At)/.0228,Gt=Ut*Math.cos(k),kt=Ut*Math.sin(k);return new e(P,et,w,V,At,zt,Nt,Gt,kt)}xyzInViewingConditions(t){let r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(r/Math.pow(1.64-Math.pow(.29,t.n),.73),1/.9),o=this.hue*Math.PI/180,a=.25*(Math.cos(o+2)+3.8),i=t.aw*Math.pow(this.j/100,1/t.c/t.z),c=a*(5e4/13)*t.nc*t.ncb,l=i/t.nbb,m=Math.sin(o),h=Math.cos(o),f=23*(l+.305)*n/(23*c+11*n*h+108*n*m),y=f*h,u=f*m,d=(460*l+451*y+288*u)/1403,p=(460*l-891*y-261*u)/1403,x=(460*l-220*y-6300*u)/1403,I=Math.max(0,27.13*Math.abs(d)/(400-Math.abs(d))),g=L(d)*(100/t.fl)*Math.pow(I,1/.42),b=Math.max(0,27.13*Math.abs(p)/(400-Math.abs(p))),D=L(p)*(100/t.fl)*Math.pow(b,1/.42),M=Math.max(0,27.13*Math.abs(x)/(400-Math.abs(x))),B=L(x)*(100/t.fl)*Math.pow(M,1/.42),P=g/t.rgbD[0],k=D/t.rgbD[1],S=B/t.rgbD[2],w=1.86206786*P-1.01125463*k+.14918677*S,V=.38752654*P+.62144744*k-.00897398*S,Y=-.0158415*P-.03412294*k+1.04996444*S;return[w,V,Y]}};var W=class e{static sanitizeRadians(t){return(t+Math.PI*8)%(Math.PI*2)}static trueDelinearized(t){let r=t/100,n=0;return r<=.0031308?n=r*12.92:n=1.055*Math.pow(r,1/2.4)-.055,n*255}static chromaticAdaptation(t){let r=Math.pow(Math.abs(t),.42);return L(t)*400*r/(r+27.13)}static hueOf(t){let r=mt(t,e.SCALED_DISCOUNT_FROM_LINRGB),n=e.chromaticAdaptation(r[0]),o=e.chromaticAdaptation(r[1]),a=e.chromaticAdaptation(r[2]),i=(11*n+-12*o+a)/11,c=(n+o-2*a)/9;return Math.atan2(c,i)}static areInCyclicOrder(t,r,n){let o=e.sanitizeRadians(r-t),a=e.sanitizeRadians(n-t);return o<a}static intercept(t,r,n){return(r-t)/(n-t)}static lerpPoint(t,r,n){return[t[0]+(n[0]-t[0])*r,t[1]+(n[1]-t[1])*r,t[2]+(n[2]-t[2])*r]}static setCoordinate(t,r,n,o){let a=e.intercept(t[o],r,n[o]);return e.lerpPoint(t,a,n)}static isBounded(t){return 0<=t&&t<=100}static nthVertex(t,r){let n=e.Y_FROM_LINRGB[0],o=e.Y_FROM_LINRGB[1],a=e.Y_FROM_LINRGB[2],i=r%4<=1?0:100,c=r%2===0?0:100;if(r<4){let l=i,m=c,h=(t-l*o-m*a)/n;return e.isBounded(h)?[h,l,m]:[-1,-1,-1]}else if(r<8){let l=i,m=c,h=(t-m*n-l*a)/o;return e.isBounded(h)?[m,h,l]:[-1,-1,-1]}else{let l=i,m=c,h=(t-l*n-m*o)/a;return e.isBounded(h)?[l,m,h]:[-1,-1,-1]}}static bisectToSegment(t,r){let n=[-1,-1,-1],o=n,a=0,i=0,c=!1,l=!0;for(let m=0;m<12;m++){let h=e.nthVertex(t,m);if(h[0]<0)continue;let f=e.hueOf(h);if(!c){n=h,o=h,a=f,i=f,c=!0;continue}(l||e.areInCyclicOrder(a,f,i))&&(l=!1,e.areInCyclicOrder(a,r,f)?(o=h,i=f):(n=h,a=f))}return[n,o]}static midpoint(t,r){return[(t[0]+r[0])/2,(t[1]+r[1])/2,(t[2]+r[2])/2]}static criticalPlaneBelow(t){return Math.floor(t-.5)}static criticalPlaneAbove(t){return Math.ceil(t-.5)}static bisectToLimit(t,r){let n=e.bisectToSegment(t,r),o=n[0],a=e.hueOf(o),i=n[1];for(let c=0;c<3;c++)if(o[c]!==i[c]){let l=-1,m=255;o[c]<i[c]?(l=e.criticalPlaneBelow(e.trueDelinearized(o[c])),m=e.criticalPlaneAbove(e.trueDelinearized(i[c]))):(l=e.criticalPlaneAbove(e.trueDelinearized(o[c])),m=e.criticalPlaneBelow(e.trueDelinearized(i[c])));for(let h=0;h<8&&!(Math.abs(m-l)<=1);h++){let f=Math.floor((l+m)/2),y=e.CRITICAL_PLANES[f],u=e.setCoordinate(o,y,i,c),d=e.hueOf(u);e.areInCyclicOrder(a,r,d)?(i=u,m=f):(o=u,a=d,l=f)}}return e.midpoint(o,i)}static inverseChromaticAdaptation(t){let r=Math.abs(t),n=Math.max(0,27.13*r/(400-r));return L(t)*Math.pow(n,1/.42)}static findResultByJ(t,r,n){let o=Math.sqrt(n)*11,a=$.DEFAULT,i=1/Math.pow(1.64-Math.pow(.29,a.n),.73),l=.25*(Math.cos(t+2)+3.8)*(5e4/13)*a.nc*a.ncb,m=Math.sin(t),h=Math.cos(t);for(let f=0;f<5;f++){let y=o/100,u=r===0||o===0?0:r/Math.sqrt(y),d=Math.pow(u*i,1/.9),x=a.aw*Math.pow(y,1/a.c/a.z)/a.nbb,I=23*(x+.305)*d/(23*l+11*d*h+108*d*m),g=I*h,b=I*m,D=(460*x+451*g+288*b)/1403,M=(460*x-891*g-261*b)/1403,B=(460*x-220*g-6300*b)/1403,P=e.inverseChromaticAdaptation(D),k=e.inverseChromaticAdaptation(M),S=e.inverseChromaticAdaptation(B),w=mt([P,k,S],e.LINRGB_FROM_SCALED_DISCOUNT);if(w[0]<0||w[1]<0||w[2]<0)return 0;let V=e.Y_FROM_LINRGB[0],Y=e.Y_FROM_LINRGB[1],q=e.Y_FROM_LINRGB[2],O=V*w[0]+Y*w[1]+q*w[2];if(O<=0)return 0;if(f===4||Math.abs(O-n)<.002)return w[0]>100.01||w[1]>100.01||w[2]>100.01?0:Yt(w);o=o-(O-n)*o/(2*O)}return 0}static solveToInt(t,r,n){if(r<1e-4||n<1e-4||n>99.9999)return he(n);t=_(t);let o=t/180*Math.PI,a=j(n),i=e.findResultByJ(o,r,a);if(i!==0)return i;let c=e.bisectToLimit(a,o);return Yt(c)}static solveToCam(t,r,n){return N.fromInt(e.solveToInt(t,r,n))}};W.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];W.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];W.Y_FROM_LINRGB=[.2126,.7152,.0722];W.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];var F=class e{static from(t,r,n){return new e(W.solveToInt(t,r,n))}static fromInt(t){return new e(t)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(t){this.setInternalState(W.solveToInt(t,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(t){this.setInternalState(W.solveToInt(this.internalHue,t,this.internalTone))}get tone(){return this.internalTone}set tone(t){this.setInternalState(W.solveToInt(this.internalHue,this.internalChroma,t))}constructor(t){this.argb=t;let r=N.fromInt(t);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=pt(t),this.argb=t}setInternalState(t){let r=N.fromInt(t);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=pt(t),this.argb=t}inViewingConditions(t){let n=N.fromInt(this.toInt()).xyzInViewingConditions(t),o=N.fromXyzInViewingConditions(n[0],n[1],n[2],$.make());return e.from(o.hue,o.chroma,dt(n[1]))}};var Dt=class e{static harmonize(t,r){let n=F.fromInt(t),o=F.fromInt(r),a=It(n.hue,o.hue),i=Math.min(a*.5,15),c=_(n.hue+i*se(n.hue,o.hue));return F.from(c,n.chroma,n.tone).toInt()}static hctHue(t,r,n){let o=e.cam16Ucs(t,r,n),a=N.fromInt(o),i=N.fromInt(t);return F.from(a.hue,i.chroma,pt(t)).toInt()}static cam16Ucs(t,r,n){let o=N.fromInt(t),a=N.fromInt(r),i=o.jstar,c=o.astar,l=o.bstar,m=a.jstar,h=a.astar,f=a.bstar,y=i+(m-i)*n,u=c+(h-c)*n,d=l+(f-l)*n;return N.fromUcs(y,u,d).toInt()}};var U=class e{static ratioOfTones(t,r){return t=st(0,100,t),r=st(0,100,r),e.ratioOfYs(j(t),j(r))}static ratioOfYs(t,r){let n=t>r?t:r,o=n===r?t:r;return(n+5)/(o+5)}static lighter(t,r){if(t<0||t>100)return-1;let n=j(t),o=r*(n+5)-5,a=e.ratioOfYs(o,n),i=Math.abs(a-r);if(a<r&&i>.04)return-1;let c=dt(o)+.4;return c<0||c>100?-1:c}static darker(t,r){if(t<0||t>100)return-1;let n=j(t),o=(n+5)/r-5,a=e.ratioOfYs(n,o),i=Math.abs(a-r);if(a<r&&i>.04)return-1;let c=dt(o)-.4;return c<0||c>100?-1:c}static lighterUnsafe(t,r){let n=e.lighter(t,r);return n<0?100:n}static darkerUnsafe(t,r){let n=e.darker(t,r);return n<0?0:n}};var ht=class e{static isDisliked(t){let r=Math.round(t.hue)>=90&&Math.round(t.hue)<=111,n=Math.round(t.chroma)>16,o=Math.round(t.tone)<65;return r&&n&&o}static fixIfDisliked(t){return e.isDisliked(t)?F.from(t.hue,t.chroma,70):t}};var C=class e{static fromPalette(t){var r,n;return new e((r=t.name)!=null?r:"",t.palette,t.tone,(n=t.isBackground)!=null?n:!1,t.background,t.secondBackground,t.contrastCurve,t.toneDeltaPair)}constructor(t,r,n,o,a,i,c,l){if(this.name=t,this.palette=r,this.tone=n,this.isBackground=o,this.background=a,this.secondBackground=i,this.contrastCurve=c,this.toneDeltaPair=l,this.hctCache=new Map,!a&&i)throw new Error(`Color ${t} has secondBackgrounddefined, but background is not defined.`);if(!a&&c)throw new Error(`Color ${t} has contrastCurvedefined, but background is not defined.`);if(a&&!c)throw new Error(`Color ${t} has backgrounddefined, but contrastCurve is not defined.`)}getArgb(t){return this.getHct(t).toInt()}getHct(t){let r=this.hctCache.get(t);if(r!=null)return r;let n=this.getTone(t),o=this.palette(t).getHct(n);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(t,o),o}getTone(t){let r=t.contrastLevel<0;if(this.toneDeltaPair){let n=this.toneDeltaPair(t),o=n.roleA,a=n.roleB,i=n.delta,c=n.polarity,l=n.stayTogether,h=this.background(t).getTone(t),f=c==="nearer"||c==="lighter"&&!t.isDark||c==="darker"&&t.isDark,y=f?o:a,u=f?a:o,d=this.name===y.name,p=t.isDark?1:-1,x=y.contrastCurve.get(t.contrastLevel),I=u.contrastCurve.get(t.contrastLevel),g=y.tone(t),b=U.ratioOfTones(h,g)>=x?g:e.foregroundTone(h,x),D=u.tone(t),M=U.ratioOfTones(h,D)>=I?D:e.foregroundTone(h,I);return r&&(b=e.foregroundTone(h,x),M=e.foregroundTone(h,I)),(M-b)*p>=i||(M=st(0,100,b+i*p),(M-b)*p>=i||(b=st(0,100,M-i*p))),50<=b&&b<60?p>0?(b=60,M=Math.max(M,b+i*p)):(b=49,M=Math.min(M,b+i*p)):50<=M&&M<60&&(l?p>0?(b=60,M=Math.max(M,b+i*p)):(b=49,M=Math.min(M,b+i*p)):p>0?M=60:M=49),d?b:M}else{let n=this.tone(t);if(this.background==null)return n;let o=this.background(t).getTone(t),a=this.contrastCurve.get(t.contrastLevel);if(U.ratioOfTones(o,n)>=a||(n=e.foregroundTone(o,a)),r&&(n=e.foregroundTone(o,a)),this.isBackground&&50<=n&&n<60&&(U.ratioOfTones(49,o)>=a?n=49:n=60),this.secondBackground){let[i,c]=[this.background,this.secondBackground],[l,m]=[i(t).getTone(t),c(t).getTone(t)],[h,f]=[Math.max(l,m),Math.min(l,m)];if(U.ratioOfTones(h,n)>=a&&U.ratioOfTones(f,n)>=a)return n;let y=U.lighter(h,a),u=U.darker(f,a),d=[];return y!==-1&&d.push(y),u!==-1&&d.push(u),e.tonePrefersLightForeground(l)||e.tonePrefersLightForeground(m)?y<0?100:y:d.length===1?d[0]:u<0?0:u}return n}}static foregroundTone(t,r){let n=U.lighterUnsafe(t,r),o=U.darkerUnsafe(t,r),a=U.ratioOfTones(n,t),i=U.ratioOfTones(o,t);if(e.tonePrefersLightForeground(t)){let l=Math.abs(a-i)<.1&&a<r&&i<r;return a>=r||a>=i||l?n:o}else return i>=r||i>=a?o:n}static tonePrefersLightForeground(t){return Math.round(t)<60}static toneAllowsLightForeground(t){return Math.round(t)<=49}static enableLightForeground(t){return e.tonePrefersLightForeground(t)&&!e.toneAllowsLightForeground(t)?49:t}};var T=class e{static fromInt(t){let r=F.fromInt(t);return e.fromHct(r)}static fromHct(t){return new e(t.hue,t.chroma,t)}static fromHueAndChroma(t,r){let n=new Wt(t,r).create();return new e(t,r,n)}constructor(t,r,n){this.hue=t,this.chroma=r,this.keyColor=n,this.cache=new Map}tone(t){let r=this.cache.get(t);return r===void 0&&(r=F.from(this.hue,this.chroma,t).toInt(),this.cache.set(t,r)),r}getHct(t){return F.fromInt(this.tone(t))}},Wt=class{constructor(t,r){this.hue=t,this.requestedChroma=r,this.chromaCache=new Map,this.maxChromaValue=200}create(){let o=0,a=100;for(;o<a;){let i=Math.floor((o+a)/2),c=this.maxChroma(i)<this.maxChroma(i+1);if(this.maxChroma(i)>=this.requestedChroma-.01)if(Math.abs(o-50)<Math.abs(a-50))a=i;else{if(o===i)return F.from(this.hue,this.requestedChroma,o);o=i}else c?o=i+1:a=i}return F.from(this.hue,this.requestedChroma,o)}maxChroma(t){if(this.chromaCache.has(t))return this.chromaCache.get(t);let r=F.from(this.hue,this.maxChromaValue,t).chroma;return this.chromaCache.set(t,r),r}};var A=class{constructor(t,r,n,o){this.low=t,this.normal=r,this.medium=n,this.high=o}get(t){return t<=-1?this.low:t<0?nt(this.low,this.normal,(t- -1)/1):t<.5?nt(this.normal,this.medium,(t-0)/.5):t<1?nt(this.medium,this.high,(t-.5)/.5):this.high}};var H=class{constructor(t,r,n,o,a){this.roleA=t,this.roleB=r,this.delta=n,this.polarity=o,this.stayTogether=a}};var E;(function(e){e[e.MONOCHROME=0]="MONOCHROME",e[e.NEUTRAL=1]="NEUTRAL",e[e.TONAL_SPOT=2]="TONAL_SPOT",e[e.VIBRANT=3]="VIBRANT",e[e.EXPRESSIVE=4]="EXPRESSIVE",e[e.FIDELITY=5]="FIDELITY",e[e.CONTENT=6]="CONTENT",e[e.RAINBOW=7]="RAINBOW",e[e.FRUIT_SALAD=8]="FRUIT_SALAD"})(E||(E={}));function ut(e){return e.variant===E.FIDELITY||e.variant===E.CONTENT}function R(e){return e.variant===E.MONOCHROME}function Ie(e,t,r,n){let o=r,a=F.from(e,t,r);if(a.chroma<t){let i=a.chroma;for(;a.chroma<t;){o+=n?-1:1;let c=F.from(e,t,o);if(i>c.chroma||Math.abs(c.chroma-t)<.4)break;let l=Math.abs(c.chroma-t),m=Math.abs(a.chroma-t);l<m&&(a=c),i=Math.max(i,c.chroma)}}return o}var s=class e{static highestSurface(t){return t.isDark?e.surfaceBright:e.surfaceDim}};s.contentAccentToneDelta=15;s.primaryPaletteKeyColor=C.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone});s.secondaryPaletteKeyColor=C.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone});s.tertiaryPaletteKeyColor=C.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone});s.neutralPaletteKeyColor=C.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone});s.neutralVariantPaletteKeyColor=C.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone});s.background=C.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0});s.onBackground=C.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>s.background,contrastCurve:new A(3,3,4.5,7)});s.surface=C.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0});s.surfaceDim=C.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:new A(87,87,80,75).get(e.contrastLevel),isBackground:!0});s.surfaceBright=C.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?new A(24,24,29,34).get(e.contrastLevel):98,isBackground:!0});s.surfaceContainerLowest=C.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new A(4,4,2,0).get(e.contrastLevel):100,isBackground:!0});s.surfaceContainerLow=C.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?new A(10,10,11,12).get(e.contrastLevel):new A(96,96,96,95).get(e.contrastLevel),isBackground:!0});s.surfaceContainer=C.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?new A(12,12,16,20).get(e.contrastLevel):new A(94,94,92,90).get(e.contrastLevel),isBackground:!0});s.surfaceContainerHigh=C.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?new A(17,17,21,25).get(e.contrastLevel):new A(92,92,88,85).get(e.contrastLevel),isBackground:!0});s.surfaceContainerHighest=C.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new A(22,22,26,30).get(e.contrastLevel):new A(90,90,84,80).get(e.contrastLevel),isBackground:!0});s.onSurface=C.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>s.highestSurface(e),contrastCurve:new A(4.5,7,11,21)});s.surfaceVariant=C.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0});s.onSurfaceVariant=C.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>s.highestSurface(e),contrastCurve:new A(3,4.5,7,11)});s.inverseSurface=C.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20});s.inverseOnSurface=C.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>s.inverseSurface,contrastCurve:new A(4.5,7,11,21)});s.outline=C.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>s.highestSurface(e),contrastCurve:new A(1.5,3,4.5,7)});s.outlineVariant=C.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5)});s.shadow=C.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0});s.scrim=C.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0});s.surfaceTint=C.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0});s.primary=C.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>R(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(3,4.5,7,7),toneDeltaPair:e=>new H(s.primaryContainer,s.primary,10,"nearer",!1)});s.onPrimary=C.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>R(e)?e.isDark?10:90:e.isDark?20:100,background:e=>s.primary,contrastCurve:new A(4.5,7,11,21)});s.primaryContainer=C.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>ut(e)?e.sourceColorHct.tone:R(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.primaryContainer,s.primary,10,"nearer",!1)});s.onPrimaryContainer=C.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>ut(e)?C.foregroundTone(s.primaryContainer.tone(e),4.5):R(e)?e.isDark?0:100:e.isDark?90:30,background:e=>s.primaryContainer,contrastCurve:new A(3,4.5,7,11)});s.inversePrimary=C.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>s.inverseSurface,contrastCurve:new A(3,4.5,7,7)});s.secondary=C.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(3,4.5,7,7),toneDeltaPair:e=>new H(s.secondaryContainer,s.secondary,10,"nearer",!1)});s.onSecondary=C.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>R(e)?e.isDark?10:100:e.isDark?20:100,background:e=>s.secondary,contrastCurve:new A(4.5,7,11,21)});s.secondaryContainer=C.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>{let t=e.isDark?30:90;return R(e)?e.isDark?30:85:ut(e)?Ie(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark):t},isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.secondaryContainer,s.secondary,10,"nearer",!1)});s.onSecondaryContainer=C.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>R(e)?e.isDark?90:10:ut(e)?C.foregroundTone(s.secondaryContainer.tone(e),4.5):e.isDark?90:30,background:e=>s.secondaryContainer,contrastCurve:new A(3,4.5,7,11)});s.tertiary=C.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>R(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(3,4.5,7,7),toneDeltaPair:e=>new H(s.tertiaryContainer,s.tertiary,10,"nearer",!1)});s.onTertiary=C.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>R(e)?e.isDark?10:90:e.isDark?20:100,background:e=>s.tertiary,contrastCurve:new A(4.5,7,11,21)});s.tertiaryContainer=C.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>{if(R(e))return e.isDark?60:49;if(!ut(e))return e.isDark?30:90;let t=e.tertiaryPalette.getHct(e.sourceColorHct.tone);return ht.fixIfDisliked(t).tone},isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.tertiaryContainer,s.tertiary,10,"nearer",!1)});s.onTertiaryContainer=C.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>R(e)?e.isDark?0:100:ut(e)?C.foregroundTone(s.tertiaryContainer.tone(e),4.5):e.isDark?90:30,background:e=>s.tertiaryContainer,contrastCurve:new A(3,4.5,7,11)});s.error=C.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(3,4.5,7,7),toneDeltaPair:e=>new H(s.errorContainer,s.error,10,"nearer",!1)});s.onError=C.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>s.error,contrastCurve:new A(4.5,7,11,21)});s.errorContainer=C.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.errorContainer,s.error,10,"nearer",!1)});s.onErrorContainer=C.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>R(e)?e.isDark?90:10:e.isDark?90:30,background:e=>s.errorContainer,contrastCurve:new A(3,4.5,7,11)});s.primaryFixed=C.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>R(e)?40:90,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.primaryFixed,s.primaryFixedDim,10,"lighter",!0)});s.primaryFixedDim=C.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>R(e)?30:80,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.primaryFixed,s.primaryFixedDim,10,"lighter",!0)});s.onPrimaryFixed=C.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>R(e)?100:10,background:e=>s.primaryFixedDim,secondBackground:e=>s.primaryFixed,contrastCurve:new A(4.5,7,11,21)});s.onPrimaryFixedVariant=C.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>R(e)?90:30,background:e=>s.primaryFixedDim,secondBackground:e=>s.primaryFixed,contrastCurve:new A(3,4.5,7,11)});s.secondaryFixed=C.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>R(e)?80:90,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.secondaryFixed,s.secondaryFixedDim,10,"lighter",!0)});s.secondaryFixedDim=C.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>R(e)?70:80,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.secondaryFixed,s.secondaryFixedDim,10,"lighter",!0)});s.onSecondaryFixed=C.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>s.secondaryFixedDim,secondBackground:e=>s.secondaryFixed,contrastCurve:new A(4.5,7,11,21)});s.onSecondaryFixedVariant=C.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>R(e)?25:30,background:e=>s.secondaryFixedDim,secondBackground:e=>s.secondaryFixed,contrastCurve:new A(3,4.5,7,11)});s.tertiaryFixed=C.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>R(e)?40:90,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.tertiaryFixed,s.tertiaryFixedDim,10,"lighter",!0)});s.tertiaryFixedDim=C.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>R(e)?30:80,isBackground:!0,background:e=>s.highestSurface(e),contrastCurve:new A(1,1,3,4.5),toneDeltaPair:e=>new H(s.tertiaryFixed,s.tertiaryFixedDim,10,"lighter",!0)});s.onTertiaryFixed=C.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>R(e)?100:10,background:e=>s.tertiaryFixedDim,secondBackground:e=>s.tertiaryFixed,contrastCurve:new A(4.5,7,11,21)});s.onTertiaryFixedVariant=C.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>R(e)?90:30,background:e=>s.tertiaryFixedDim,secondBackground:e=>s.tertiaryFixed,contrastCurve:new A(3,4.5,7,11)});var v=class{constructor(t){this.sourceColorArgb=t.sourceColorArgb,this.variant=t.variant,this.contrastLevel=t.contrastLevel,this.isDark=t.isDark,this.sourceColorHct=F.fromInt(t.sourceColorArgb),this.primaryPalette=t.primaryPalette,this.secondaryPalette=t.secondaryPalette,this.tertiaryPalette=t.tertiaryPalette,this.neutralPalette=t.neutralPalette,this.neutralVariantPalette=t.neutralVariantPalette,this.errorPalette=T.fromHueAndChroma(25,84)}static getRotatedHue(t,r,n){let o=t.hue;if(r.length!==n.length)throw new Error(`mismatch between hue length ${r.length} & rotations ${n.length}`);if(n.length===1)return _(t.hue+n[0]);let a=r.length;for(let i=0;i<=a-2;i++){let c=r[i],l=r[i+1];if(c<o&&o<l)return _(o+n[i])}return o}getArgb(t){return t.getArgb(this)}getHct(t){return t.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(s.primaryPaletteKeyColor)}get secondaryPaletteKeyColor(){return this.getArgb(s.secondaryPaletteKeyColor)}get tertiaryPaletteKeyColor(){return this.getArgb(s.tertiaryPaletteKeyColor)}get neutralPaletteKeyColor(){return this.getArgb(s.neutralPaletteKeyColor)}get neutralVariantPaletteKeyColor(){return this.getArgb(s.neutralVariantPaletteKeyColor)}get background(){return this.getArgb(s.background)}get onBackground(){return this.getArgb(s.onBackground)}get surface(){return this.getArgb(s.surface)}get surfaceDim(){return this.getArgb(s.surfaceDim)}get surfaceBright(){return this.getArgb(s.surfaceBright)}get surfaceContainerLowest(){return this.getArgb(s.surfaceContainerLowest)}get surfaceContainerLow(){return this.getArgb(s.surfaceContainerLow)}get surfaceContainer(){return this.getArgb(s.surfaceContainer)}get surfaceContainerHigh(){return this.getArgb(s.surfaceContainerHigh)}get surfaceContainerHighest(){return this.getArgb(s.surfaceContainerHighest)}get onSurface(){return this.getArgb(s.onSurface)}get surfaceVariant(){return this.getArgb(s.surfaceVariant)}get onSurfaceVariant(){return this.getArgb(s.onSurfaceVariant)}get inverseSurface(){return this.getArgb(s.inverseSurface)}get inverseOnSurface(){return this.getArgb(s.inverseOnSurface)}get outline(){return this.getArgb(s.outline)}get outlineVariant(){return this.getArgb(s.outlineVariant)}get shadow(){return this.getArgb(s.shadow)}get scrim(){return this.getArgb(s.scrim)}get surfaceTint(){return this.getArgb(s.surfaceTint)}get primary(){return this.getArgb(s.primary)}get onPrimary(){return this.getArgb(s.onPrimary)}get primaryContainer(){return this.getArgb(s.primaryContainer)}get onPrimaryContainer(){return this.getArgb(s.onPrimaryContainer)}get inversePrimary(){return this.getArgb(s.inversePrimary)}get secondary(){return this.getArgb(s.secondary)}get onSecondary(){return this.getArgb(s.onSecondary)}get secondaryContainer(){return this.getArgb(s.secondaryContainer)}get onSecondaryContainer(){return this.getArgb(s.onSecondaryContainer)}get tertiary(){return this.getArgb(s.tertiary)}get onTertiary(){return this.getArgb(s.onTertiary)}get tertiaryContainer(){return this.getArgb(s.tertiaryContainer)}get onTertiaryContainer(){return this.getArgb(s.onTertiaryContainer)}get error(){return this.getArgb(s.error)}get onError(){return this.getArgb(s.onError)}get errorContainer(){return this.getArgb(s.errorContainer)}get onErrorContainer(){return this.getArgb(s.onErrorContainer)}get primaryFixed(){return this.getArgb(s.primaryFixed)}get primaryFixedDim(){return this.getArgb(s.primaryFixedDim)}get onPrimaryFixed(){return this.getArgb(s.onPrimaryFixed)}get onPrimaryFixedVariant(){return this.getArgb(s.onPrimaryFixedVariant)}get secondaryFixed(){return this.getArgb(s.secondaryFixed)}get secondaryFixedDim(){return this.getArgb(s.secondaryFixedDim)}get onSecondaryFixed(){return this.getArgb(s.onSecondaryFixed)}get onSecondaryFixedVariant(){return this.getArgb(s.onSecondaryFixedVariant)}get tertiaryFixed(){return this.getArgb(s.tertiaryFixed)}get tertiaryFixedDim(){return this.getArgb(s.tertiaryFixedDim)}get onTertiaryFixed(){return this.getArgb(s.onTertiaryFixed)}get onTertiaryFixedVariant(){return this.getArgb(s.onTertiaryFixedVariant)}};var X=class e{static of(t){return new e(t,!1)}static contentOf(t){return new e(t,!0)}static fromColors(t){return e.createPaletteFromColors(!1,t)}static contentFromColors(t){return e.createPaletteFromColors(!0,t)}static createPaletteFromColors(t,r){let n=new e(r.primary,t);if(r.secondary){let o=new e(r.secondary,t);n.a2=o.a1}if(r.tertiary){let o=new e(r.tertiary,t);n.a3=o.a1}if(r.error){let o=new e(r.error,t);n.error=o.a1}if(r.neutral){let o=new e(r.neutral,t);n.n1=o.n1}if(r.neutralVariant){let o=new e(r.neutralVariant,t);n.n2=o.n2}return n}constructor(t,r){let n=F.fromInt(t),o=n.hue,a=n.chroma;r?(this.a1=T.fromHueAndChroma(o,a),this.a2=T.fromHueAndChroma(o,a/3),this.a3=T.fromHueAndChroma(o+60,a/2),this.n1=T.fromHueAndChroma(o,Math.min(a/12,4)),this.n2=T.fromHueAndChroma(o,Math.min(a/6,8))):(this.a1=T.fromHueAndChroma(o,Math.max(48,a)),this.a2=T.fromHueAndChroma(o,16),this.a3=T.fromHueAndChroma(o+60,24),this.n1=T.fromHueAndChroma(o,4),this.n2=T.fromHueAndChroma(o,8)),this.error=T.fromHueAndChroma(25,84)}};var wt=class{fromInt(t){return Kt(t)}toInt(t){return le(t[0],t[1],t[2])}distance(t,r){let n=t[0]-r[0],o=t[1]-r[1],a=t[2]-r[2];return n*n+o*o+a*a}};var Te=10,De=3,St=class{static quantize(t,r,n){let o=new Map,a=new Array,i=new Array,c=new wt,l=0;for(let g=0;g<t.length;g++){let b=t[g],D=o.get(b);D===void 0?(l++,a.push(c.fromInt(b)),i.push(b),o.set(b,1)):o.set(b,D+1)}let m=new Array;for(let g=0;g<l;g++){let b=i[g],D=o.get(b);D!==void 0&&(m[g]=D)}let h=Math.min(n,l);r.length>0&&(h=Math.min(h,r.length));let f=new Array;for(let g=0;g<r.length;g++)f.push(c.fromInt(r[g]));let y=h-f.length;if(r.length===0&&y>0)for(let g=0;g<y;g++){let b=Math.random()*100,D=Math.random()*201+-100,M=Math.random()*201+-100;f.push(new Array(b,D,M))}let u=new Array;for(let g=0;g<l;g++)u.push(Math.floor(Math.random()*h));let d=new Array;for(let g=0;g<h;g++){d.push(new Array);for(let b=0;b<h;b++)d[g].push(0)}let p=new Array;for(let g=0;g<h;g++){p.push(new Array);for(let b=0;b<h;b++)p[g].push(new Xt)}let x=new Array;for(let g=0;g<h;g++)x.push(0);for(let g=0;g<Te;g++){for(let P=0;P<h;P++){for(let k=P+1;k<h;k++){let S=c.distance(f[P],f[k]);p[k][P].distance=S,p[k][P].index=P,p[P][k].distance=S,p[P][k].index=k}p[P].sort();for(let k=0;k<h;k++)d[P][k]=p[P][k].index}let b=0;for(let P=0;P<l;P++){let k=a[P],S=u[P],w=f[S],V=c.distance(k,w),Y=V,q=-1;for(let O=0;O<h;O++){if(p[S][O].distance>=4*V)continue;let rt=c.distance(k,f[O]);rt<Y&&(Y=rt,q=O)}q!==-1&&Math.abs(Math.sqrt(Y)-Math.sqrt(V))>De&&(b++,u[P]=q)}if(b===0&&g!==0)break;let D=new Array(h).fill(0),M=new Array(h).fill(0),B=new Array(h).fill(0);for(let P=0;P<h;P++)x[P]=0;for(let P=0;P<l;P++){let k=u[P],S=a[P],w=m[P];x[k]+=w,D[k]+=S[0]*w,M[k]+=S[1]*w,B[k]+=S[2]*w}for(let P=0;P<h;P++){let k=x[P];if(k===0){f[P]=[0,0,0];continue}let S=D[P]/k,w=M[P]/k,V=B[P]/k;f[P]=[S,w,V]}}let I=new Map;for(let g=0;g<h;g++){let b=x[g];if(b===0)continue;let D=c.toInt(f[g]);I.has(D)||I.set(D,b)}return I}},Xt=class{constructor(){this.distance=-1,this.index=-1}};var Ft=class{static quantize(t){var n;let r=new Map;for(let o=0;o<t.length;o++){let a=t[o];ce(a)<255||r.set(a,((n=r.get(a))!=null?n:0)+1)}return r}};var Bt=5,J=33,yt=35937,G={RED:"red",GREEN:"green",BLUE:"blue"},Rt=class{constructor(t=[],r=[],n=[],o=[],a=[],i=[]){this.weights=t,this.momentsR=r,this.momentsG=n,this.momentsB=o,this.moments=a,this.cubes=i}quantize(t,r){this.constructHistogram(t),this.computeMoments();let n=this.createBoxes(r);return this.createResult(n.resultCount)}constructHistogram(t){var n;this.weights=Array.from({length:yt}).fill(0),this.momentsR=Array.from({length:yt}).fill(0),this.momentsG=Array.from({length:yt}).fill(0),this.momentsB=Array.from({length:yt}).fill(0),this.moments=Array.from({length:yt}).fill(0);let r=Ft.quantize(t);for(let[o,a]of r.entries()){let i=it(o),c=ct(o),l=lt(o),m=8-Bt,h=(i>>m)+1,f=(c>>m)+1,y=(l>>m)+1,u=this.getIndex(h,f,y);this.weights[u]=((n=this.weights[u])!=null?n:0)+a,this.momentsR[u]+=a*i,this.momentsG[u]+=a*c,this.momentsB[u]+=a*l,this.moments[u]+=a*(i*i+c*c+l*l)}}computeMoments(){for(let t=1;t<J;t++){let r=Array.from({length:J}).fill(0),n=Array.from({length:J}).fill(0),o=Array.from({length:J}).fill(0),a=Array.from({length:J}).fill(0),i=Array.from({length:J}).fill(0);for(let c=1;c<J;c++){let l=0,m=0,h=0,f=0,y=0;for(let u=1;u<J;u++){let d=this.getIndex(t,c,u);l+=this.weights[d],m+=this.momentsR[d],h+=this.momentsG[d],f+=this.momentsB[d],y+=this.moments[d],r[u]+=l,n[u]+=m,o[u]+=h,a[u]+=f,i[u]+=y;let p=this.getIndex(t-1,c,u);this.weights[d]=this.weights[p]+r[u],this.momentsR[d]=this.momentsR[p]+n[u],this.momentsG[d]=this.momentsG[p]+o[u],this.momentsB[d]=this.momentsB[p]+a[u],this.moments[d]=this.moments[p]+i[u]}}}}createBoxes(t){this.cubes=Array.from({length:t}).fill(0).map(()=>new Jt);let r=Array.from({length:t}).fill(0);this.cubes[0].r0=0,this.cubes[0].g0=0,this.cubes[0].b0=0,this.cubes[0].r1=J-1,this.cubes[0].g1=J-1,this.cubes[0].b1=J-1;let n=t,o=0;for(let a=1;a<t;a++){this.cut(this.cubes[o],this.cubes[a])?(r[o]=this.cubes[o].vol>1?this.variance(this.cubes[o]):0,r[a]=this.cubes[a].vol>1?this.variance(this.cubes[a]):0):(r[o]=0,a--),o=0;let i=r[0];for(let c=1;c<=a;c++)r[c]>i&&(i=r[c],o=c);if(i<=0){n=a+1;break}}return new Zt(t,n)}createResult(t){let r=[];for(let n=0;n<t;++n){let o=this.cubes[n],a=this.volume(o,this.weights);if(a>0){let i=Math.round(this.volume(o,this.momentsR)/a),c=Math.round(this.volume(o,this.momentsG)/a),l=Math.round(this.volume(o,this.momentsB)/a),m=255<<24|(i&255)<<16|(c&255)<<8|l&255;r.push(m)}}return r}variance(t){let r=this.volume(t,this.momentsR),n=this.volume(t,this.momentsG),o=this.volume(t,this.momentsB),a=this.moments[this.getIndex(t.r1,t.g1,t.b1)]-this.moments[this.getIndex(t.r1,t.g1,t.b0)]-this.moments[this.getIndex(t.r1,t.g0,t.b1)]+this.moments[this.getIndex(t.r1,t.g0,t.b0)]-this.moments[this.getIndex(t.r0,t.g1,t.b1)]+this.moments[this.getIndex(t.r0,t.g1,t.b0)]+this.moments[this.getIndex(t.r0,t.g0,t.b1)]-this.moments[this.getIndex(t.r0,t.g0,t.b0)],i=r*r+n*n+o*o,c=this.volume(t,this.weights);return a-i/c}cut(t,r){let n=this.volume(t,this.momentsR),o=this.volume(t,this.momentsG),a=this.volume(t,this.momentsB),i=this.volume(t,this.weights),c=this.maximize(t,G.RED,t.r0+1,t.r1,n,o,a,i),l=this.maximize(t,G.GREEN,t.g0+1,t.g1,n,o,a,i),m=this.maximize(t,G.BLUE,t.b0+1,t.b1,n,o,a,i),h,f=c.maximum,y=l.maximum,u=m.maximum;if(f>=y&&f>=u){if(c.cutLocation<0)return!1;h=G.RED}else y>=f&&y>=u?h=G.GREEN:h=G.BLUE;switch(r.r1=t.r1,r.g1=t.g1,r.b1=t.b1,h){case G.RED:t.r1=c.cutLocation,r.r0=t.r1,r.g0=t.g0,r.b0=t.b0;break;case G.GREEN:t.g1=l.cutLocation,r.r0=t.r0,r.g0=t.g1,r.b0=t.b0;break;case G.BLUE:t.b1=m.cutLocation,r.r0=t.r0,r.g0=t.g0,r.b0=t.b1;break;default:throw new Error("unexpected direction "+h)}return t.vol=(t.r1-t.r0)*(t.g1-t.g0)*(t.b1-t.b0),r.vol=(r.r1-r.r0)*(r.g1-r.g0)*(r.b1-r.b0),!0}maximize(t,r,n,o,a,i,c,l){let m=this.bottom(t,r,this.momentsR),h=this.bottom(t,r,this.momentsG),f=this.bottom(t,r,this.momentsB),y=this.bottom(t,r,this.weights),u=0,d=-1,p=0,x=0,I=0,g=0;for(let b=n;b<o;b++){if(p=m+this.top(t,r,b,this.momentsR),x=h+this.top(t,r,b,this.momentsG),I=f+this.top(t,r,b,this.momentsB),g=y+this.top(t,r,b,this.weights),g===0)continue;let D=(p*p+x*x+I*I)*1,M=g*1,B=D/M;p=a-p,x=i-x,I=c-I,g=l-g,g!==0&&(D=(p*p+x*x+I*I)*1,M=g*1,B+=D/M,B>u&&(u=B,d=b))}return new Qt(d,u)}volume(t,r){return r[this.getIndex(t.r1,t.g1,t.b1)]-r[this.getIndex(t.r1,t.g1,t.b0)]-r[this.getIndex(t.r1,t.g0,t.b1)]+r[this.getIndex(t.r1,t.g0,t.b0)]-r[this.getIndex(t.r0,t.g1,t.b1)]+r[this.getIndex(t.r0,t.g1,t.b0)]+r[this.getIndex(t.r0,t.g0,t.b1)]-r[this.getIndex(t.r0,t.g0,t.b0)]}bottom(t,r,n){switch(r){case G.RED:return-n[this.getIndex(t.r0,t.g1,t.b1)]+n[this.getIndex(t.r0,t.g1,t.b0)]+n[this.getIndex(t.r0,t.g0,t.b1)]-n[this.getIndex(t.r0,t.g0,t.b0)];case G.GREEN:return-n[this.getIndex(t.r1,t.g0,t.b1)]+n[this.getIndex(t.r1,t.g0,t.b0)]+n[this.getIndex(t.r0,t.g0,t.b1)]-n[this.getIndex(t.r0,t.g0,t.b0)];case G.BLUE:return-n[this.getIndex(t.r1,t.g1,t.b0)]+n[this.getIndex(t.r1,t.g0,t.b0)]+n[this.getIndex(t.r0,t.g1,t.b0)]-n[this.getIndex(t.r0,t.g0,t.b0)];default:throw new Error("unexpected direction $direction")}}top(t,r,n,o){switch(r){case G.RED:return o[this.getIndex(n,t.g1,t.b1)]-o[this.getIndex(n,t.g1,t.b0)]-o[this.getIndex(n,t.g0,t.b1)]+o[this.getIndex(n,t.g0,t.b0)];case G.GREEN:return o[this.getIndex(t.r1,n,t.b1)]-o[this.getIndex(t.r1,n,t.b0)]-o[this.getIndex(t.r0,n,t.b1)]+o[this.getIndex(t.r0,n,t.b0)];case G.BLUE:return o[this.getIndex(t.r1,t.g1,n)]-o[this.getIndex(t.r1,t.g0,n)]-o[this.getIndex(t.r0,t.g1,n)]+o[this.getIndex(t.r0,t.g0,n)];default:throw new Error("unexpected direction $direction")}}getIndex(t,r,n){return(t<<Bt*2)+(t<<Bt+1)+t+(r<<Bt)+r+n}},Jt=class{constructor(t=0,r=0,n=0,o=0,a=0,i=0,c=0){this.r0=t,this.r1=r,this.g0=n,this.g1=o,this.b0=a,this.b1=i,this.vol=c}},Zt=class{constructor(t,r){this.requestedCount=t,this.resultCount=r}},Qt=class{constructor(t,r){this.cutLocation=t,this.maximum=r}};var Ot=class{static quantize(t,r){let o=new Rt().quantize(t,r);return St.quantize(t,o,r)}};var bt=class e{get primary(){return this.props.primary}get onPrimary(){return this.props.onPrimary}get primaryContainer(){return this.props.primaryContainer}get onPrimaryContainer(){return this.props.onPrimaryContainer}get secondary(){return this.props.secondary}get onSecondary(){return this.props.onSecondary}get secondaryContainer(){return this.props.secondaryContainer}get onSecondaryContainer(){return this.props.onSecondaryContainer}get tertiary(){return this.props.tertiary}get onTertiary(){return this.props.onTertiary}get tertiaryContainer(){return this.props.tertiaryContainer}get onTertiaryContainer(){return this.props.onTertiaryContainer}get error(){return this.props.error}get onError(){return this.props.onError}get errorContainer(){return this.props.errorContainer}get onErrorContainer(){return this.props.onErrorContainer}get background(){return this.props.background}get onBackground(){return this.props.onBackground}get surface(){return this.props.surface}get onSurface(){return this.props.onSurface}get surfaceVariant(){return this.props.surfaceVariant}get onSurfaceVariant(){return this.props.onSurfaceVariant}get outline(){return this.props.outline}get outlineVariant(){return this.props.outlineVariant}get shadow(){return this.props.shadow}get scrim(){return this.props.scrim}get inverseSurface(){return this.props.inverseSurface}get inverseOnSurface(){return this.props.inverseOnSurface}get inversePrimary(){return this.props.inversePrimary}static light(t){return e.lightFromCorePalette(X.of(t))}static dark(t){return e.darkFromCorePalette(X.of(t))}static lightContent(t){return e.lightFromCorePalette(X.contentOf(t))}static darkContent(t){return e.darkFromCorePalette(X.contentOf(t))}static lightFromCorePalette(t){return new e({primary:t.a1.tone(40),onPrimary:t.a1.tone(100),primaryContainer:t.a1.tone(90),onPrimaryContainer:t.a1.tone(10),secondary:t.a2.tone(40),onSecondary:t.a2.tone(100),secondaryContainer:t.a2.tone(90),onSecondaryContainer:t.a2.tone(10),tertiary:t.a3.tone(40),onTertiary:t.a3.tone(100),tertiaryContainer:t.a3.tone(90),onTertiaryContainer:t.a3.tone(10),error:t.error.tone(40),onError:t.error.tone(100),errorContainer:t.error.tone(90),onErrorContainer:t.error.tone(10),background:t.n1.tone(99),onBackground:t.n1.tone(10),surface:t.n1.tone(99),onSurface:t.n1.tone(10),surfaceVariant:t.n2.tone(90),onSurfaceVariant:t.n2.tone(30),outline:t.n2.tone(50),outlineVariant:t.n2.tone(80),shadow:t.n1.tone(0),scrim:t.n1.tone(0),inverseSurface:t.n1.tone(20),inverseOnSurface:t.n1.tone(95),inversePrimary:t.a1.tone(80)})}static darkFromCorePalette(t){return new e({primary:t.a1.tone(80),onPrimary:t.a1.tone(20),primaryContainer:t.a1.tone(30),onPrimaryContainer:t.a1.tone(90),secondary:t.a2.tone(80),onSecondary:t.a2.tone(20),secondaryContainer:t.a2.tone(30),onSecondaryContainer:t.a2.tone(90),tertiary:t.a3.tone(80),onTertiary:t.a3.tone(20),tertiaryContainer:t.a3.tone(30),onTertiaryContainer:t.a3.tone(90),error:t.error.tone(80),onError:t.error.tone(20),errorContainer:t.error.tone(30),onErrorContainer:t.error.tone(80),background:t.n1.tone(10),onBackground:t.n1.tone(90),surface:t.n1.tone(10),onSurface:t.n1.tone(90),surfaceVariant:t.n2.tone(30),onSurfaceVariant:t.n2.tone(80),outline:t.n2.tone(60),outlineVariant:t.n2.tone(30),shadow:t.n1.tone(0),scrim:t.n1.tone(0),inverseSurface:t.n1.tone(90),inverseOnSurface:t.n1.tone(20),inversePrimary:t.a1.tone(40)})}constructor(t){this.props=t}toJSON(){return at({},this.props)}};var Pt=class e extends v{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:E.EXPRESSIVE,contrastLevel:n,isDark:r,primaryPalette:T.fromHueAndChroma(_(t.hue+240),40),secondaryPalette:T.fromHueAndChroma(v.getRotatedHue(t,e.hues,e.secondaryRotations),24),tertiaryPalette:T.fromHueAndChroma(v.getRotatedHue(t,e.hues,e.tertiaryRotations),32),neutralPalette:T.fromHueAndChroma(t.hue+15,8),neutralVariantPalette:T.fromHueAndChroma(t.hue+15,12)})}};Pt.hues=[0,21,51,121,151,191,271,321,360];Pt.secondaryRotations=[45,95,45,20,45,90,45,45,45];Pt.tertiaryRotations=[120,120,20,45,20,15,20,120,120];var Ct=class e extends v{constructor(t,r,n){super({sourceColorArgb:t.toInt(),variant:E.VIBRANT,contrastLevel:n,isDark:r,primaryPalette:T.fromHueAndChroma(t.hue,200),secondaryPalette:T.fromHueAndChroma(v.getRotatedHue(t,e.hues,e.secondaryRotations),24),tertiaryPalette:T.fromHueAndChroma(v.getRotatedHue(t,e.hues,e.tertiaryRotations),32),neutralPalette:T.fromHueAndChroma(t.hue,10),neutralVariantPalette:T.fromHueAndChroma(t.hue,12)})}};Ct.hues=[0,41,61,101,131,181,251,301,360];Ct.secondaryRotations=[18,15,10,12,15,18,15,12,12];Ct.tertiaryRotations=[35,30,20,25,30,35,30,25,25];var Se={desired:4,fallbackColorARGB:4282549748,filter:!0};function Fe(e,t){return e.score>t.score?-1:e.score<t.score?1:0}var Q=class e{constructor(){}static score(t,r){let{desired:n,fallbackColorARGB:o,filter:a}=at(at({},Se),r),i=[],c=new Array(360).fill(0),l=0;for(let[u,d]of t.entries()){let p=F.fromInt(u);i.push(p);let x=Math.floor(p.hue);c[x]+=d,l+=d}let m=new Array(360).fill(0);for(let u=0;u<360;u++){let d=c[u]/l;for(let p=u-14;p<u+16;p++){let x=Mt(p);m[x]+=d}}let h=new Array;for(let u of i){let d=Mt(Math.round(u.hue)),p=m[d];if(a&&(u.chroma<e.CUTOFF_CHROMA||p<=e.CUTOFF_EXCITED_PROPORTION))continue;let x=p*100*e.WEIGHT_PROPORTION,I=u.chroma<e.TARGET_CHROMA?e.WEIGHT_CHROMA_BELOW:e.WEIGHT_CHROMA_ABOVE,g=(u.chroma-e.TARGET_CHROMA)*I,b=x+g;h.push({hct:u,score:b})}h.sort(Fe);let f=[];for(let u=90;u>=15;u--){f.length=0;for(let{hct:d}of h)if(f.find(x=>It(d.hue,x.hue)<u)||f.push(d),f.length>=n)break;if(f.length>=n)break}let y=[];f.length===0&&y.push(o);for(let u of f)y.push(u.toInt());return y}};Q.TARGET_CHROMA=48;Q.WEIGHT_PROPORTION=.7;Q.WEIGHT_CHROMA_ABOVE=.3;Q.WEIGHT_CHROMA_BELOW=.1;Q.CUTOFF_CHROMA=5;Q.CUTOFF_EXCITED_PROPORTION=.01;function Ht(e){let t=it(e),r=ct(e),n=lt(e),o=[t.toString(16),r.toString(16),n.toString(16)];for(let[a,i]of o.entries())i.length===1&&(o[a]="0"+i);return"#"+o.join("")}function me(e){e=e.replace("#","");let t=e.length===3,r=e.length===6,n=e.length===8;if(!t&&!r&&!n)throw new Error("unexpected hex "+e);let o=0,a=0,i=0;return t?(o=tt(e.slice(0,1).repeat(2)),a=tt(e.slice(1,2).repeat(2)),i=tt(e.slice(2,3).repeat(2))):r?(o=tt(e.slice(0,2)),a=tt(e.slice(2,4)),i=tt(e.slice(4,6))):n&&(o=tt(e.slice(2,4)),a=tt(e.slice(4,6)),i=tt(e.slice(6,8))),(255<<24|(o&255)<<16|(a&255)<<8|i&255)>>>0}function tt(e){return parseInt(e,16)}async function te(e){let t=await new Promise((i,c)=>{let l=document.createElement("canvas"),m=l.getContext("2d");if(!m){c(new Error("Could not get canvas context"));return}let h=()=>{l.width=e.width,l.height=e.height,m.drawImage(e,0,0);let y=[0,0,e.width,e.height],u=e.dataset.area;u&&/^\d+(\s*,\s*\d+){3}$/.test(u)&&(y=u.split(/\s*,\s*/).map(g=>parseInt(g,10)));let[d,p,x,I]=y;i(m.getImageData(d,p,x,I).data)},f=()=>{c(new Error("Image load failed"))};e.complete?h():(e.onload=h,e.onerror=f)}),r=[];for(let i=0;i<t.length;i+=4){let c=t[i],l=t[i+1],m=t[i+2];if(t[i+3]<255)continue;let f=gt(c,l,m);r.push(f)}let n=Ot.quantize(r,128);return Q.score(n)[0]}function fe(e,t=[]){let r=X.of(e);return{source:e,schemes:{light:bt.light(e),dark:bt.dark(e)},palettes:{primary:r.a1,secondary:r.a2,tertiary:r.a3,neutral:r.n1,neutralVariant:r.n2,error:r.error},customColors:t.map(n=>Be(e,n))}}function Be(e,t){let r=t.value,n=r,o=e;t.blend&&(r=Dt.harmonize(n,o));let i=X.of(r).a1;return{color:t,value:r,light:{color:i.tone(40),onColor:i.tone(100),colorContainer:i.tone(90),onColorContainer:i.tone(10)},dark:{color:i.tone(80),onColor:i.tone(20),colorContainer:i.tone(30),onColorContainer:i.tone(90)}}}var ge=e=>{let t=Number.parseInt(e.slice(1),16);return`${t>>16&255},${t>>8&255},${t&255}`},Re="clr-surface",Oe="clr-primary",He="clr-on-primary",Ee="clr-on-surface",ve={surface:{light:[99,98,95,90,80,70],dark:[6,12,20,24,28,38],prefix:Re},primary:{light:[40,50,60,70,80,90],dark:[80,70,60,50,40,30],prefix:Oe},"on-primary":{light:[6,12,20,24,28,38],dark:[99,95,90,80,70,60],prefix:He},"on-surface":{light:[6,12,20,24,28,38],dark:[99,95,90,80,70,60],prefix:Ee}},vt=(e,t)=>`--${e}: ${t};`;function Et(e,t,r){let n=ve[t];if(!n)return console.error(`Unknown scheme type: ${t}`),"";let o=r?n.dark:n.light,a=n.prefix;return o.map((i,c)=>{let l=Ht(e.tone(i));return vt(`${a}-${c}`,l)+vt(`${a}-${c}-rgb`,ge(l))}).join("")}function Le(e){let t="";for(let r in e){let n=e[r];if(typeof n=="number"){let o=r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=Ht(n);t+=vt(`clr-${o}`,a),t+=vt(`clr-${o}-rgb`,ge(a))}}return t}function pe(e,t={}){let{dark:r=!1,tonal:n=!0}=t,o=fe(typeof e=="number"?e:me(e)),a=r?o.schemes.dark:o.schemes.light,i=n?o.palettes.neutralVariant:o.palettes.neutral,c=o.palettes.primary;return`${Le(a.toJSON())}${Et(i,"surface",r)}${Et(i,"on-surface",r)}${Et(c,"primary",r)}${Et(c,"on-primary",r)}`}var Lt=class{constructor(t){_t(this,"max");_t(this,"cache");this.max=t,this.cache=new Map}get(t){let r=this.cache.get(t);if(r)return this.cache.delete(t),this.cache.set(t,r),r}set(t,r){if(this.cache.has(t))this.cache.delete(t);else if(this.cache.size>=this.max){let n=this.cache.keys().next().value;n&&this.cache.delete(n)}this.cache.set(t,r)}};var Ve=100,Vt=new Lt(Ve);self.addEventListener("message",async e=>{try{let t="#1bc858",r=null,n=null;if(e.data.type==="image"){n=e.data.options.url;let a=Vt.get(n);if(a!==void 0)r=a;else{let i=new Image;i.crossOrigin="Anonymous",i.src=e.data.options.url,await new Promise((c,l)=>{i.onload=()=>c(),i.onerror=m=>l(m)}),r=await te(i),Vt.set(n,r)}}else{n=e.data.options.hex;let a=Vt.get(n);a!==void 0?r=a:(r=e.data.options.hex,Vt.set(n,r))}let o={style:pe(r!=null?r:t,{dark:e.data.options.isDark,tonal:e.data.options.isTonal}),color:r};self.postMessage({success:!0,message:"Colors generated Successfully.",data:o})}catch(t){self.postMessage({success:!1,message:t.message})}});})();
/*! Bundled license information:

@material/material-color-utilities/utils/math_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/color_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/viewing_conditions.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/cam16.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct_solver.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/blend/blend.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/contrast/contrast.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dislike/dislike_analyzer.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_color.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/tonal_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/contrast_curve.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/tone_delta_pair.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/variant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_scheme.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/core_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/lab_point_provider.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wsmeans.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wu.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_celebi.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_android.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/temperature/temperature_cache.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_content.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_expressive.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fidelity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fruit_salad.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_monochrome.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_neutral.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_rainbow.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_tonal_spot.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_vibrant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/score/score.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/string_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/image_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/theme_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/index.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
