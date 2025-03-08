"use strict";(()=>{var xe=Object.defineProperty;var Zt=Object.getOwnPropertySymbols;var Ae=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable;var Qt=(t,e,r)=>e in t?xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ot=(t,e)=>{for(var r in e||(e={}))Ae.call(e,r)&&Qt(t,r,e[r]);if(Zt)for(var r of Zt(e))De.call(e,r)&&Qt(t,r,e[r]);return t};function O(t){return t<0?-1:t===0?0:1}function et(t,e,r){return(1-r)*t+r*e}function te(t,e,r){return r<t?t:r>e?e:r}function at(t,e,r){return r<t?t:r>e?e:r}function Pt(t){return t=t%360,t<0&&(t=t+360),t}function N(t){return t=t%360,t<0&&(t=t+360),t}function ee(t,e){return N(e-t)<=180?1:-1}function xt(t,e){return 180-Math.abs(Math.abs(t-e)-180)}function ct(t,e){let r=t[0]*e[0][0]+t[1]*e[0][1]+t[2]*e[0][2],n=t[0]*e[1][0]+t[1]*e[1][1]+t[2]*e[1][2],o=t[0]*e[2][0]+t[1]*e[2][1]+t[2]*e[2][2];return[r,n,o]}var Ie=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],Me=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],we=[95.047,100,108.883];function At(t,e,r){return(255<<24|(t&255)<<16|(e&255)<<8|r&255)>>>0}function Ht(t){let e=nt(t[0]),r=nt(t[1]),n=nt(t[2]);return At(e,r,n)}function Dt(t){return t>>16&255}function It(t){return t>>8&255}function Mt(t){return t&255}function re(t,e,r){let n=Me,o=n[0][0]*t+n[0][1]*e+n[0][2]*r,s=n[1][0]*t+n[1][1]*e+n[1][2]*r,i=n[2][0]*t+n[2][1]*e+n[2][2]*r,c=nt(o),l=nt(s),h=nt(i);return At(c,l,h)}function ke(t){let e=rt(Dt(t)),r=rt(It(t)),n=rt(Mt(t));return ct([e,r,n],Ie)}function ne(t){let e=G(t),r=nt(e);return At(r,r,r)}function lt(t){let e=ke(t)[1];return 116*ae(e/100)-16}function G(t){return 100*Te((t+16)/116)}function ht(t){return ae(t/100)*116-16}function rt(t){let e=t/255;return e<=.040449936?e/12.92*100:Math.pow((e+.055)/1.055,2.4)*100}function nt(t){let e=t/100,r=0;return e<=.0031308?r=e*12.92:r=1.055*Math.pow(e,1/2.4)-.055,te(0,255,Math.round(r*255))}function oe(){return we}function ae(t){let e=.008856451679035631,r=24389/27;return t>e?Math.pow(t,1/3):(r*t+16)/116}function Te(t){let e=.008856451679035631,r=24389/27,n=t*t*t;return n>e?n:(116*t-16)/r}var z=class t{static make(e=oe(),r=200/Math.PI*G(50)/100,n=50,o=2,s=!1){let i=e,c=i[0]*.401288+i[1]*.650173+i[2]*-.051461,l=i[0]*-.250268+i[1]*1.204414+i[2]*.045854,h=i[0]*-.002079+i[1]*.048952+i[2]*.953127,u=.8+o/10,m=u>=.9?et(.59,.69,(u-.9)*10):et(.525,.59,(u-.8)*10),p=s?1:u*(1-1/3.6*Math.exp((-r-42)/92));p=p>1?1:p<0?0:p;let g=u,y=[p*(100/c)+1-p,p*(100/l)+1-p,p*(100/h)+1-p],C=1/(5*r+1),b=C*C*C*C,k=1-b,M=b*r+.1*k*k*Math.cbrt(5*r),P=G(n)/e[1],L=1.48+Math.sqrt(P),A=.725/Math.pow(P,.2),F=A,D=[Math.pow(M*y[0]*c/100,.42),Math.pow(M*y[1]*l/100,.42),Math.pow(M*y[2]*h/100,.42)],S=[400*D[0]/(D[0]+27.13),400*D[1]/(D[1]+27.13),400*D[2]/(D[2]+27.13)],E=(2*S[0]+S[1]+.05*S[2])*A;return new t(P,E,A,F,m,g,y,M,Math.pow(M,.25),L)}constructor(e,r,n,o,s,i,c,l,h,u){this.n=e,this.aw=r,this.nbb=n,this.ncb=o,this.c=s,this.nc=i,this.rgbD=c,this.fl=l,this.fLRoot=h,this.z=u}};z.DEFAULT=z.make();var v=class t{constructor(e,r,n,o,s,i,c,l,h){this.hue=e,this.chroma=r,this.j=n,this.q=o,this.m=s,this.s=i,this.jstar=c,this.astar=l,this.bstar=h}distance(e){let r=this.jstar-e.jstar,n=this.astar-e.astar,o=this.bstar-e.bstar,s=Math.sqrt(r*r+n*n+o*o);return 1.41*Math.pow(s,.63)}static fromInt(e){return t.fromIntInViewingConditions(e,z.DEFAULT)}static fromIntInViewingConditions(e,r){let n=(e&16711680)>>16,o=(e&65280)>>8,s=e&255,i=rt(n),c=rt(o),l=rt(s),h=.41233895*i+.35762064*c+.18051042*l,u=.2126*i+.7152*c+.0722*l,m=.01932141*i+.11916382*c+.95034478*l,p=.401288*h+.650173*u-.051461*m,g=-.250268*h+1.204414*u+.045854*m,y=-.002079*h+.048952*u+.953127*m,C=r.rgbD[0]*p,b=r.rgbD[1]*g,k=r.rgbD[2]*y,M=Math.pow(r.fl*Math.abs(C)/100,.42),P=Math.pow(r.fl*Math.abs(b)/100,.42),L=Math.pow(r.fl*Math.abs(k)/100,.42),A=O(C)*400*M/(M+27.13),F=O(b)*400*P/(P+27.13),D=O(k)*400*L/(L+27.13),S=(11*A+-12*F+D)/11,E=(A+F-2*D)/9,T=(20*A+20*F+21*D)/20,Y=(40*A+20*F+D)/20,X=Math.atan2(E,S)*180/Math.PI,U=X<0?X+360:X>=360?X-360:X,dt=U*Math.PI/180,yt=Y*r.nbb,Z=100*Math.pow(yt/r.aw,r.c*r.z),Ct=4/r.c*Math.sqrt(Z/100)*(r.aw+4)*r.fLRoot,Bt=U<20.14?U+360:U,Rt=.25*(Math.cos(Bt*Math.PI/180+2)+3.8),Lt=5e4/13*Rt*r.nc*r.ncb*Math.sqrt(S*S+E*E)/(T+.305),bt=Math.pow(Lt,.9)*Math.pow(1.64-Math.pow(.29,r.n),.73),Wt=bt*Math.sqrt(Z/100),Jt=Wt*r.fLRoot,ye=50*Math.sqrt(bt*r.c/(r.aw+4)),Ce=(1+100*.007)*Z/(1+.007*Z),Kt=1/.0228*Math.log(1+.0228*Jt),be=Kt*Math.cos(dt),Pe=Kt*Math.sin(dt);return new t(U,Wt,Z,Ct,Jt,ye,Ce,be,Pe)}static fromJch(e,r,n){return t.fromJchInViewingConditions(e,r,n,z.DEFAULT)}static fromJchInViewingConditions(e,r,n,o){let s=4/o.c*Math.sqrt(e/100)*(o.aw+4)*o.fLRoot,i=r*o.fLRoot,c=r/Math.sqrt(e/100),l=50*Math.sqrt(c*o.c/(o.aw+4)),h=n*Math.PI/180,u=(1+100*.007)*e/(1+.007*e),m=1/.0228*Math.log(1+.0228*i),p=m*Math.cos(h),g=m*Math.sin(h);return new t(n,r,e,s,i,l,u,p,g)}static fromUcs(e,r,n){return t.fromUcsInViewingConditions(e,r,n,z.DEFAULT)}static fromUcsInViewingConditions(e,r,n,o){let s=r,i=n,c=Math.sqrt(s*s+i*i),h=(Math.exp(c*.0228)-1)/.0228/o.fLRoot,u=Math.atan2(i,s)*(180/Math.PI);u<0&&(u+=360);let m=e/(1-(e-100)*.007);return t.fromJchInViewingConditions(m,h,u,o)}toInt(){return this.viewed(z.DEFAULT)}viewed(e){let r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(r/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,s=.25*(Math.cos(o+2)+3.8),i=e.aw*Math.pow(this.j/100,1/e.c/e.z),c=s*(5e4/13)*e.nc*e.ncb,l=i/e.nbb,h=Math.sin(o),u=Math.cos(o),m=23*(l+.305)*n/(23*c+11*n*u+108*n*h),p=m*u,g=m*h,y=(460*l+451*p+288*g)/1403,C=(460*l-891*p-261*g)/1403,b=(460*l-220*p-6300*g)/1403,k=Math.max(0,27.13*Math.abs(y)/(400-Math.abs(y))),M=O(y)*(100/e.fl)*Math.pow(k,1/.42),P=Math.max(0,27.13*Math.abs(C)/(400-Math.abs(C))),L=O(C)*(100/e.fl)*Math.pow(P,1/.42),A=Math.max(0,27.13*Math.abs(b)/(400-Math.abs(b))),F=O(b)*(100/e.fl)*Math.pow(A,1/.42),D=M/e.rgbD[0],S=L/e.rgbD[1],E=F/e.rgbD[2],T=1.86206786*D-1.01125463*S+.14918677*E,Y=.38752654*D+.62144744*S-.00897398*E,K=-.0158415*D-.03412294*S+1.04996444*E;return re(T,Y,K)}static fromXyzInViewingConditions(e,r,n,o){let s=.401288*e+.650173*r-.051461*n,i=-.250268*e+1.204414*r+.045854*n,c=-.002079*e+.048952*r+.953127*n,l=o.rgbD[0]*s,h=o.rgbD[1]*i,u=o.rgbD[2]*c,m=Math.pow(o.fl*Math.abs(l)/100,.42),p=Math.pow(o.fl*Math.abs(h)/100,.42),g=Math.pow(o.fl*Math.abs(u)/100,.42),y=O(l)*400*m/(m+27.13),C=O(h)*400*p/(p+27.13),b=O(u)*400*g/(g+27.13),k=(11*y+-12*C+b)/11,M=(y+C-2*b)/9,P=(20*y+20*C+21*b)/20,L=(40*y+20*C+b)/20,F=Math.atan2(M,k)*180/Math.PI,D=F<0?F+360:F>=360?F-360:F,S=D*Math.PI/180,E=L*o.nbb,T=100*Math.pow(E/o.aw,o.c*o.z),Y=4/o.c*Math.sqrt(T/100)*(o.aw+4)*o.fLRoot,K=D<20.14?D+360:D,X=1/4*(Math.cos(K*Math.PI/180+2)+3.8),dt=5e4/13*X*o.nc*o.ncb*Math.sqrt(k*k+M*M)/(P+.305),yt=Math.pow(dt,.9)*Math.pow(1.64-Math.pow(.29,o.n),.73),Z=yt*Math.sqrt(T/100),Ct=Z*o.fLRoot,Bt=50*Math.sqrt(yt*o.c/(o.aw+4)),Rt=(1+100*.007)*T/(1+.007*T),Ot=Math.log(1+.0228*Ct)/.0228,Lt=Ot*Math.cos(S),bt=Ot*Math.sin(S);return new t(D,Z,T,Y,Ct,Bt,Rt,Lt,bt)}xyzInViewingConditions(e){let r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(r/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,s=.25*(Math.cos(o+2)+3.8),i=e.aw*Math.pow(this.j/100,1/e.c/e.z),c=s*(5e4/13)*e.nc*e.ncb,l=i/e.nbb,h=Math.sin(o),u=Math.cos(o),m=23*(l+.305)*n/(23*c+11*n*u+108*n*h),p=m*u,g=m*h,y=(460*l+451*p+288*g)/1403,C=(460*l-891*p-261*g)/1403,b=(460*l-220*p-6300*g)/1403,k=Math.max(0,27.13*Math.abs(y)/(400-Math.abs(y))),M=O(y)*(100/e.fl)*Math.pow(k,1/.42),P=Math.max(0,27.13*Math.abs(C)/(400-Math.abs(C))),L=O(C)*(100/e.fl)*Math.pow(P,1/.42),A=Math.max(0,27.13*Math.abs(b)/(400-Math.abs(b))),F=O(b)*(100/e.fl)*Math.pow(A,1/.42),D=M/e.rgbD[0],S=L/e.rgbD[1],E=F/e.rgbD[2],T=1.86206786*D-1.01125463*S+.14918677*E,Y=.38752654*D+.62144744*S-.00897398*E,K=-.0158415*D-.03412294*S+1.04996444*E;return[T,Y,K]}};var q=class t{static sanitizeRadians(e){return(e+Math.PI*8)%(Math.PI*2)}static trueDelinearized(e){let r=e/100,n=0;return r<=.0031308?n=r*12.92:n=1.055*Math.pow(r,1/2.4)-.055,n*255}static chromaticAdaptation(e){let r=Math.pow(Math.abs(e),.42);return O(e)*400*r/(r+27.13)}static hueOf(e){let r=ct(e,t.SCALED_DISCOUNT_FROM_LINRGB),n=t.chromaticAdaptation(r[0]),o=t.chromaticAdaptation(r[1]),s=t.chromaticAdaptation(r[2]),i=(11*n+-12*o+s)/11,c=(n+o-2*s)/9;return Math.atan2(c,i)}static areInCyclicOrder(e,r,n){let o=t.sanitizeRadians(r-e),s=t.sanitizeRadians(n-e);return o<s}static intercept(e,r,n){return(r-e)/(n-e)}static lerpPoint(e,r,n){return[e[0]+(n[0]-e[0])*r,e[1]+(n[1]-e[1])*r,e[2]+(n[2]-e[2])*r]}static setCoordinate(e,r,n,o){let s=t.intercept(e[o],r,n[o]);return t.lerpPoint(e,s,n)}static isBounded(e){return 0<=e&&e<=100}static nthVertex(e,r){let n=t.Y_FROM_LINRGB[0],o=t.Y_FROM_LINRGB[1],s=t.Y_FROM_LINRGB[2],i=r%4<=1?0:100,c=r%2===0?0:100;if(r<4){let l=i,h=c,u=(e-l*o-h*s)/n;return t.isBounded(u)?[u,l,h]:[-1,-1,-1]}else if(r<8){let l=i,h=c,u=(e-h*n-l*s)/o;return t.isBounded(u)?[h,u,l]:[-1,-1,-1]}else{let l=i,h=c,u=(e-l*n-h*o)/s;return t.isBounded(u)?[l,h,u]:[-1,-1,-1]}}static bisectToSegment(e,r){let n=[-1,-1,-1],o=n,s=0,i=0,c=!1,l=!0;for(let h=0;h<12;h++){let u=t.nthVertex(e,h);if(u[0]<0)continue;let m=t.hueOf(u);if(!c){n=u,o=u,s=m,i=m,c=!0;continue}(l||t.areInCyclicOrder(s,m,i))&&(l=!1,t.areInCyclicOrder(s,r,m)?(o=u,i=m):(n=u,s=m))}return[n,o]}static midpoint(e,r){return[(e[0]+r[0])/2,(e[1]+r[1])/2,(e[2]+r[2])/2]}static criticalPlaneBelow(e){return Math.floor(e-.5)}static criticalPlaneAbove(e){return Math.ceil(e-.5)}static bisectToLimit(e,r){let n=t.bisectToSegment(e,r),o=n[0],s=t.hueOf(o),i=n[1];for(let c=0;c<3;c++)if(o[c]!==i[c]){let l=-1,h=255;o[c]<i[c]?(l=t.criticalPlaneBelow(t.trueDelinearized(o[c])),h=t.criticalPlaneAbove(t.trueDelinearized(i[c]))):(l=t.criticalPlaneAbove(t.trueDelinearized(o[c])),h=t.criticalPlaneBelow(t.trueDelinearized(i[c])));for(let u=0;u<8&&!(Math.abs(h-l)<=1);u++){let m=Math.floor((l+h)/2),p=t.CRITICAL_PLANES[m],g=t.setCoordinate(o,p,i,c),y=t.hueOf(g);t.areInCyclicOrder(s,r,y)?(i=g,h=m):(o=g,s=y,l=m)}}return t.midpoint(o,i)}static inverseChromaticAdaptation(e){let r=Math.abs(e),n=Math.max(0,27.13*r/(400-r));return O(e)*Math.pow(n,1/.42)}static findResultByJ(e,r,n){let o=Math.sqrt(n)*11,s=z.DEFAULT,i=1/Math.pow(1.64-Math.pow(.29,s.n),.73),l=.25*(Math.cos(e+2)+3.8)*(5e4/13)*s.nc*s.ncb,h=Math.sin(e),u=Math.cos(e);for(let m=0;m<5;m++){let p=o/100,g=r===0||o===0?0:r/Math.sqrt(p),y=Math.pow(g*i,1/.9),b=s.aw*Math.pow(p,1/s.c/s.z)/s.nbb,k=23*(b+.305)*y/(23*l+11*y*u+108*y*h),M=k*u,P=k*h,L=(460*b+451*M+288*P)/1403,A=(460*b-891*M-261*P)/1403,F=(460*b-220*M-6300*P)/1403,D=t.inverseChromaticAdaptation(L),S=t.inverseChromaticAdaptation(A),E=t.inverseChromaticAdaptation(F),T=ct([D,S,E],t.LINRGB_FROM_SCALED_DISCOUNT);if(T[0]<0||T[1]<0||T[2]<0)return 0;let Y=t.Y_FROM_LINRGB[0],K=t.Y_FROM_LINRGB[1],X=t.Y_FROM_LINRGB[2],U=Y*T[0]+K*T[1]+X*T[2];if(U<=0)return 0;if(m===4||Math.abs(U-n)<.002)return T[0]>100.01||T[1]>100.01||T[2]>100.01?0:Ht(T);o=o-(U-n)*o/(2*U)}return 0}static solveToInt(e,r,n){if(r<1e-4||n<1e-4||n>99.9999)return ne(n);e=N(e);let o=e/180*Math.PI,s=G(n),i=t.findResultByJ(o,r,s);if(i!==0)return i;let c=t.bisectToLimit(s,o);return Ht(c)}static solveToCam(e,r,n){return v.fromInt(t.solveToInt(e,r,n))}};q.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];q.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];q.Y_FROM_LINRGB=[.2126,.7152,.0722];q.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];var I=class t{static from(e,r,n){return new t(q.solveToInt(e,r,n))}static fromInt(e){return new t(e)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(e){this.setInternalState(q.solveToInt(e,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(e){this.setInternalState(q.solveToInt(this.internalHue,e,this.internalTone))}get tone(){return this.internalTone}set tone(e){this.setInternalState(q.solveToInt(this.internalHue,this.internalChroma,e))}constructor(e){this.argb=e;let r=v.fromInt(e);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=lt(e),this.argb=e}setInternalState(e){let r=v.fromInt(e);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=lt(e),this.argb=e}inViewingConditions(e){let n=v.fromInt(this.toInt()).xyzInViewingConditions(e),o=v.fromXyzInViewingConditions(n[0],n[1],n[2],z.make());return t.from(o.hue,o.chroma,ht(n[1]))}};var wt=class t{static harmonize(e,r){let n=I.fromInt(e),o=I.fromInt(r),s=xt(n.hue,o.hue),i=Math.min(s*.5,15),c=N(n.hue+i*ee(n.hue,o.hue));return I.from(c,n.chroma,n.tone).toInt()}static hctHue(e,r,n){let o=t.cam16Ucs(e,r,n),s=v.fromInt(o),i=v.fromInt(e);return I.from(s.hue,i.chroma,lt(e)).toInt()}static cam16Ucs(e,r,n){let o=v.fromInt(e),s=v.fromInt(r),i=o.jstar,c=o.astar,l=o.bstar,h=s.jstar,u=s.astar,m=s.bstar,p=i+(h-i)*n,g=c+(u-c)*n,y=l+(m-l)*n;return v.fromUcs(p,g,y).toInt()}};var V=class t{static ratioOfTones(e,r){return e=at(0,100,e),r=at(0,100,r),t.ratioOfYs(G(e),G(r))}static ratioOfYs(e,r){let n=e>r?e:r,o=n===r?e:r;return(n+5)/(o+5)}static lighter(e,r){if(e<0||e>100)return-1;let n=G(e),o=r*(n+5)-5,s=t.ratioOfYs(o,n),i=Math.abs(s-r);if(s<r&&i>.04)return-1;let c=ht(o)+.4;return c<0||c>100?-1:c}static darker(e,r){if(e<0||e>100)return-1;let n=G(e),o=(n+5)/r-5,s=t.ratioOfYs(n,o),i=Math.abs(s-r);if(s<r&&i>.04)return-1;let c=ht(o)-.4;return c<0||c>100?-1:c}static lighterUnsafe(e,r){let n=t.lighter(e,r);return n<0?100:n}static darkerUnsafe(e,r){let n=t.darker(e,r);return n<0?0:n}};var st=class t{static isDisliked(e){let r=Math.round(e.hue)>=90&&Math.round(e.hue)<=111,n=Math.round(e.chroma)>16,o=Math.round(e.tone)<65;return r&&n&&o}static fixIfDisliked(e){return t.isDisliked(e)?I.from(e.hue,e.chroma,70):e}};var f=class t{static fromPalette(e){var r,n;return new t((r=e.name)!=null?r:"",e.palette,e.tone,(n=e.isBackground)!=null?n:!1,e.background,e.secondBackground,e.contrastCurve,e.toneDeltaPair)}constructor(e,r,n,o,s,i,c,l){if(this.name=e,this.palette=r,this.tone=n,this.isBackground=o,this.background=s,this.secondBackground=i,this.contrastCurve=c,this.toneDeltaPair=l,this.hctCache=new Map,!s&&i)throw new Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);if(!s&&c)throw new Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);if(s&&!c)throw new Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`)}getArgb(e){return this.getHct(e).toInt()}getHct(e){let r=this.hctCache.get(e);if(r!=null)return r;let n=this.getTone(e),o=this.palette(e).getHct(n);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(e,o),o}getTone(e){let r=e.contrastLevel<0;if(this.toneDeltaPair){let n=this.toneDeltaPair(e),o=n.roleA,s=n.roleB,i=n.delta,c=n.polarity,l=n.stayTogether,u=this.background(e).getTone(e),m=c==="nearer"||c==="lighter"&&!e.isDark||c==="darker"&&e.isDark,p=m?o:s,g=m?s:o,y=this.name===p.name,C=e.isDark?1:-1,b=p.contrastCurve.get(e.contrastLevel),k=g.contrastCurve.get(e.contrastLevel),M=p.tone(e),P=V.ratioOfTones(u,M)>=b?M:t.foregroundTone(u,b),L=g.tone(e),A=V.ratioOfTones(u,L)>=k?L:t.foregroundTone(u,k);return r&&(P=t.foregroundTone(u,b),A=t.foregroundTone(u,k)),(A-P)*C>=i||(A=at(0,100,P+i*C),(A-P)*C>=i||(P=at(0,100,A-i*C))),50<=P&&P<60?C>0?(P=60,A=Math.max(A,P+i*C)):(P=49,A=Math.min(A,P+i*C)):50<=A&&A<60&&(l?C>0?(P=60,A=Math.max(A,P+i*C)):(P=49,A=Math.min(A,P+i*C)):C>0?A=60:A=49),y?P:A}else{let n=this.tone(e);if(this.background==null)return n;let o=this.background(e).getTone(e),s=this.contrastCurve.get(e.contrastLevel);if(V.ratioOfTones(o,n)>=s||(n=t.foregroundTone(o,s)),r&&(n=t.foregroundTone(o,s)),this.isBackground&&50<=n&&n<60&&(V.ratioOfTones(49,o)>=s?n=49:n=60),this.secondBackground){let[i,c]=[this.background,this.secondBackground],[l,h]=[i(e).getTone(e),c(e).getTone(e)],[u,m]=[Math.max(l,h),Math.min(l,h)];if(V.ratioOfTones(u,n)>=s&&V.ratioOfTones(m,n)>=s)return n;let p=V.lighter(u,s),g=V.darker(m,s),y=[];return p!==-1&&y.push(p),g!==-1&&y.push(g),t.tonePrefersLightForeground(l)||t.tonePrefersLightForeground(h)?p<0?100:p:y.length===1?y[0]:g<0?0:g}return n}}static foregroundTone(e,r){let n=V.lighterUnsafe(e,r),o=V.darkerUnsafe(e,r),s=V.ratioOfTones(n,e),i=V.ratioOfTones(o,e);if(t.tonePrefersLightForeground(e)){let l=Math.abs(s-i)<.1&&s<r&&i<r;return s>=r||s>=i||l?n:o}else return i>=r||i>=s?o:n}static tonePrefersLightForeground(e){return Math.round(e)<60}static toneAllowsLightForeground(e){return Math.round(e)<=49}static enableLightForeground(e){return t.tonePrefersLightForeground(e)&&!t.toneAllowsLightForeground(e)?49:e}};var x=class t{static fromInt(e){let r=I.fromInt(e);return t.fromHct(r)}static fromHct(e){return new t(e.hue,e.chroma,e)}static fromHueAndChroma(e,r){let n=new vt(e,r).create();return new t(e,r,n)}constructor(e,r,n){this.hue=e,this.chroma=r,this.keyColor=n,this.cache=new Map}tone(e){let r=this.cache.get(e);return r===void 0&&(r=I.from(this.hue,this.chroma,e).toInt(),this.cache.set(e,r)),r}getHct(e){return I.fromInt(this.tone(e))}},vt=class{constructor(e,r){this.hue=e,this.requestedChroma=r,this.chromaCache=new Map,this.maxChromaValue=200}create(){let o=0,s=100;for(;o<s;){let i=Math.floor((o+s)/2),c=this.maxChroma(i)<this.maxChroma(i+1);if(this.maxChroma(i)>=this.requestedChroma-.01)if(Math.abs(o-50)<Math.abs(s-50))s=i;else{if(o===i)return I.from(this.hue,this.requestedChroma,o);o=i}else c?o=i+1:s=i}return I.from(this.hue,this.requestedChroma,o)}maxChroma(e){if(this.chromaCache.has(e))return this.chromaCache.get(e);let r=I.from(this.hue,this.maxChromaValue,e).chroma;return this.chromaCache.set(e,r),r}};var d=class{constructor(e,r,n,o){this.low=e,this.normal=r,this.medium=n,this.high=o}get(e){return e<=-1?this.low:e<0?et(this.low,this.normal,(e- -1)/1):e<.5?et(this.normal,this.medium,(e-0)/.5):e<1?et(this.medium,this.high,(e-.5)/.5):this.high}};var _=class{constructor(e,r,n,o,s){this.roleA=e,this.roleB=r,this.delta=n,this.polarity=o,this.stayTogether=s}};var B;(function(t){t[t.MONOCHROME=0]="MONOCHROME",t[t.NEUTRAL=1]="NEUTRAL",t[t.TONAL_SPOT=2]="TONAL_SPOT",t[t.VIBRANT=3]="VIBRANT",t[t.EXPRESSIVE=4]="EXPRESSIVE",t[t.FIDELITY=5]="FIDELITY",t[t.CONTENT=6]="CONTENT",t[t.RAINBOW=7]="RAINBOW",t[t.FRUIT_SALAD=8]="FRUIT_SALAD"})(B||(B={}));function it(t){return t.variant===B.FIDELITY||t.variant===B.CONTENT}function w(t){return t.variant===B.MONOCHROME}function Se(t,e,r,n){let o=r,s=I.from(t,e,r);if(s.chroma<e){let i=s.chroma;for(;s.chroma<e;){o+=n?-1:1;let c=I.from(t,e,o);if(i>c.chroma||Math.abs(c.chroma-e)<.4)break;let l=Math.abs(c.chroma-e),h=Math.abs(s.chroma-e);l<h&&(s=c),i=Math.max(i,c.chroma)}}return o}var a=class t{static highestSurface(e){return e.isDark?t.surfaceBright:t.surfaceDim}};a.contentAccentToneDelta=15;a.primaryPaletteKeyColor=f.fromPalette({name:"primary_palette_key_color",palette:t=>t.primaryPalette,tone:t=>t.primaryPalette.keyColor.tone});a.secondaryPaletteKeyColor=f.fromPalette({name:"secondary_palette_key_color",palette:t=>t.secondaryPalette,tone:t=>t.secondaryPalette.keyColor.tone});a.tertiaryPaletteKeyColor=f.fromPalette({name:"tertiary_palette_key_color",palette:t=>t.tertiaryPalette,tone:t=>t.tertiaryPalette.keyColor.tone});a.neutralPaletteKeyColor=f.fromPalette({name:"neutral_palette_key_color",palette:t=>t.neutralPalette,tone:t=>t.neutralPalette.keyColor.tone});a.neutralVariantPaletteKeyColor=f.fromPalette({name:"neutral_variant_palette_key_color",palette:t=>t.neutralVariantPalette,tone:t=>t.neutralVariantPalette.keyColor.tone});a.background=f.fromPalette({name:"background",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:98,isBackground:!0});a.onBackground=f.fromPalette({name:"on_background",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:10,background:t=>a.background,contrastCurve:new d(3,3,4.5,7)});a.surface=f.fromPalette({name:"surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:98,isBackground:!0});a.surfaceDim=f.fromPalette({name:"surface_dim",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:new d(87,87,80,75).get(t.contrastLevel),isBackground:!0});a.surfaceBright=f.fromPalette({name:"surface_bright",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(24,24,29,34).get(t.contrastLevel):98,isBackground:!0});a.surfaceContainerLowest=f.fromPalette({name:"surface_container_lowest",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(4,4,2,0).get(t.contrastLevel):100,isBackground:!0});a.surfaceContainerLow=f.fromPalette({name:"surface_container_low",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(10,10,11,12).get(t.contrastLevel):new d(96,96,96,95).get(t.contrastLevel),isBackground:!0});a.surfaceContainer=f.fromPalette({name:"surface_container",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(12,12,16,20).get(t.contrastLevel):new d(94,94,92,90).get(t.contrastLevel),isBackground:!0});a.surfaceContainerHigh=f.fromPalette({name:"surface_container_high",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(17,17,21,25).get(t.contrastLevel):new d(92,92,88,85).get(t.contrastLevel),isBackground:!0});a.surfaceContainerHighest=f.fromPalette({name:"surface_container_highest",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(22,22,26,30).get(t.contrastLevel):new d(90,90,84,80).get(t.contrastLevel),isBackground:!0});a.onSurface=f.fromPalette({name:"on_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:10,background:t=>a.highestSurface(t),contrastCurve:new d(4.5,7,11,21)});a.surfaceVariant=f.fromPalette({name:"surface_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?30:90,isBackground:!0});a.onSurfaceVariant=f.fromPalette({name:"on_surface_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?80:30,background:t=>a.highestSurface(t),contrastCurve:new d(3,4.5,7,11)});a.inverseSurface=f.fromPalette({name:"inverse_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:20});a.inverseOnSurface=f.fromPalette({name:"inverse_on_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?20:95,background:t=>a.inverseSurface,contrastCurve:new d(4.5,7,11,21)});a.outline=f.fromPalette({name:"outline",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?60:50,background:t=>a.highestSurface(t),contrastCurve:new d(1.5,3,4.5,7)});a.outlineVariant=f.fromPalette({name:"outline_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?30:80,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5)});a.shadow=f.fromPalette({name:"shadow",palette:t=>t.neutralPalette,tone:t=>0});a.scrim=f.fromPalette({name:"scrim",palette:t=>t.neutralPalette,tone:t=>0});a.surfaceTint=f.fromPalette({name:"surface_tint",palette:t=>t.primaryPalette,tone:t=>t.isDark?80:40,isBackground:!0});a.primary=f.fromPalette({name:"primary",palette:t=>t.primaryPalette,tone:t=>w(t)?t.isDark?100:0:t.isDark?80:40,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new _(a.primaryContainer,a.primary,10,"nearer",!1)});a.onPrimary=f.fromPalette({name:"on_primary",palette:t=>t.primaryPalette,tone:t=>w(t)?t.isDark?10:90:t.isDark?20:100,background:t=>a.primary,contrastCurve:new d(4.5,7,11,21)});a.primaryContainer=f.fromPalette({name:"primary_container",palette:t=>t.primaryPalette,tone:t=>it(t)?t.sourceColorHct.tone:w(t)?t.isDark?85:25:t.isDark?30:90,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.primaryContainer,a.primary,10,"nearer",!1)});a.onPrimaryContainer=f.fromPalette({name:"on_primary_container",palette:t=>t.primaryPalette,tone:t=>it(t)?f.foregroundTone(a.primaryContainer.tone(t),4.5):w(t)?t.isDark?0:100:t.isDark?90:30,background:t=>a.primaryContainer,contrastCurve:new d(3,4.5,7,11)});a.inversePrimary=f.fromPalette({name:"inverse_primary",palette:t=>t.primaryPalette,tone:t=>t.isDark?40:80,background:t=>a.inverseSurface,contrastCurve:new d(3,4.5,7,7)});a.secondary=f.fromPalette({name:"secondary",palette:t=>t.secondaryPalette,tone:t=>t.isDark?80:40,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new _(a.secondaryContainer,a.secondary,10,"nearer",!1)});a.onSecondary=f.fromPalette({name:"on_secondary",palette:t=>t.secondaryPalette,tone:t=>w(t)?t.isDark?10:100:t.isDark?20:100,background:t=>a.secondary,contrastCurve:new d(4.5,7,11,21)});a.secondaryContainer=f.fromPalette({name:"secondary_container",palette:t=>t.secondaryPalette,tone:t=>{let e=t.isDark?30:90;return w(t)?t.isDark?30:85:it(t)?Se(t.secondaryPalette.hue,t.secondaryPalette.chroma,e,!t.isDark):e},isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.secondaryContainer,a.secondary,10,"nearer",!1)});a.onSecondaryContainer=f.fromPalette({name:"on_secondary_container",palette:t=>t.secondaryPalette,tone:t=>w(t)?t.isDark?90:10:it(t)?f.foregroundTone(a.secondaryContainer.tone(t),4.5):t.isDark?90:30,background:t=>a.secondaryContainer,contrastCurve:new d(3,4.5,7,11)});a.tertiary=f.fromPalette({name:"tertiary",palette:t=>t.tertiaryPalette,tone:t=>w(t)?t.isDark?90:25:t.isDark?80:40,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new _(a.tertiaryContainer,a.tertiary,10,"nearer",!1)});a.onTertiary=f.fromPalette({name:"on_tertiary",palette:t=>t.tertiaryPalette,tone:t=>w(t)?t.isDark?10:90:t.isDark?20:100,background:t=>a.tertiary,contrastCurve:new d(4.5,7,11,21)});a.tertiaryContainer=f.fromPalette({name:"tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>{if(w(t))return t.isDark?60:49;if(!it(t))return t.isDark?30:90;let e=t.tertiaryPalette.getHct(t.sourceColorHct.tone);return st.fixIfDisliked(e).tone},isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.tertiaryContainer,a.tertiary,10,"nearer",!1)});a.onTertiaryContainer=f.fromPalette({name:"on_tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>w(t)?t.isDark?0:100:it(t)?f.foregroundTone(a.tertiaryContainer.tone(t),4.5):t.isDark?90:30,background:t=>a.tertiaryContainer,contrastCurve:new d(3,4.5,7,11)});a.error=f.fromPalette({name:"error",palette:t=>t.errorPalette,tone:t=>t.isDark?80:40,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new _(a.errorContainer,a.error,10,"nearer",!1)});a.onError=f.fromPalette({name:"on_error",palette:t=>t.errorPalette,tone:t=>t.isDark?20:100,background:t=>a.error,contrastCurve:new d(4.5,7,11,21)});a.errorContainer=f.fromPalette({name:"error_container",palette:t=>t.errorPalette,tone:t=>t.isDark?30:90,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.errorContainer,a.error,10,"nearer",!1)});a.onErrorContainer=f.fromPalette({name:"on_error_container",palette:t=>t.errorPalette,tone:t=>w(t)?t.isDark?90:10:t.isDark?90:30,background:t=>a.errorContainer,contrastCurve:new d(3,4.5,7,11)});a.primaryFixed=f.fromPalette({name:"primary_fixed",palette:t=>t.primaryPalette,tone:t=>w(t)?40:90,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.primaryFixed,a.primaryFixedDim,10,"lighter",!0)});a.primaryFixedDim=f.fromPalette({name:"primary_fixed_dim",palette:t=>t.primaryPalette,tone:t=>w(t)?30:80,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.primaryFixed,a.primaryFixedDim,10,"lighter",!0)});a.onPrimaryFixed=f.fromPalette({name:"on_primary_fixed",palette:t=>t.primaryPalette,tone:t=>w(t)?100:10,background:t=>a.primaryFixedDim,secondBackground:t=>a.primaryFixed,contrastCurve:new d(4.5,7,11,21)});a.onPrimaryFixedVariant=f.fromPalette({name:"on_primary_fixed_variant",palette:t=>t.primaryPalette,tone:t=>w(t)?90:30,background:t=>a.primaryFixedDim,secondBackground:t=>a.primaryFixed,contrastCurve:new d(3,4.5,7,11)});a.secondaryFixed=f.fromPalette({name:"secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>w(t)?80:90,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.secondaryFixed,a.secondaryFixedDim,10,"lighter",!0)});a.secondaryFixedDim=f.fromPalette({name:"secondary_fixed_dim",palette:t=>t.secondaryPalette,tone:t=>w(t)?70:80,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.secondaryFixed,a.secondaryFixedDim,10,"lighter",!0)});a.onSecondaryFixed=f.fromPalette({name:"on_secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>10,background:t=>a.secondaryFixedDim,secondBackground:t=>a.secondaryFixed,contrastCurve:new d(4.5,7,11,21)});a.onSecondaryFixedVariant=f.fromPalette({name:"on_secondary_fixed_variant",palette:t=>t.secondaryPalette,tone:t=>w(t)?25:30,background:t=>a.secondaryFixedDim,secondBackground:t=>a.secondaryFixed,contrastCurve:new d(3,4.5,7,11)});a.tertiaryFixed=f.fromPalette({name:"tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>w(t)?40:90,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.tertiaryFixed,a.tertiaryFixedDim,10,"lighter",!0)});a.tertiaryFixedDim=f.fromPalette({name:"tertiary_fixed_dim",palette:t=>t.tertiaryPalette,tone:t=>w(t)?30:80,isBackground:!0,background:t=>a.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new _(a.tertiaryFixed,a.tertiaryFixedDim,10,"lighter",!0)});a.onTertiaryFixed=f.fromPalette({name:"on_tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>w(t)?100:10,background:t=>a.tertiaryFixedDim,secondBackground:t=>a.tertiaryFixed,contrastCurve:new d(4.5,7,11,21)});a.onTertiaryFixedVariant=f.fromPalette({name:"on_tertiary_fixed_variant",palette:t=>t.tertiaryPalette,tone:t=>w(t)?90:30,background:t=>a.tertiaryFixedDim,secondBackground:t=>a.tertiaryFixed,contrastCurve:new d(3,4.5,7,11)});var R=class{constructor(e){this.sourceColorArgb=e.sourceColorArgb,this.variant=e.variant,this.contrastLevel=e.contrastLevel,this.isDark=e.isDark,this.sourceColorHct=I.fromInt(e.sourceColorArgb),this.primaryPalette=e.primaryPalette,this.secondaryPalette=e.secondaryPalette,this.tertiaryPalette=e.tertiaryPalette,this.neutralPalette=e.neutralPalette,this.neutralVariantPalette=e.neutralVariantPalette,this.errorPalette=x.fromHueAndChroma(25,84)}static getRotatedHue(e,r,n){let o=e.hue;if(r.length!==n.length)throw new Error(`mismatch between hue length ${r.length} & rotations ${n.length}`);if(n.length===1)return N(e.hue+n[0]);let s=r.length;for(let i=0;i<=s-2;i++){let c=r[i],l=r[i+1];if(c<o&&o<l)return N(o+n[i])}return o}getArgb(e){return e.getArgb(this)}getHct(e){return e.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(a.primaryPaletteKeyColor)}get secondaryPaletteKeyColor(){return this.getArgb(a.secondaryPaletteKeyColor)}get tertiaryPaletteKeyColor(){return this.getArgb(a.tertiaryPaletteKeyColor)}get neutralPaletteKeyColor(){return this.getArgb(a.neutralPaletteKeyColor)}get neutralVariantPaletteKeyColor(){return this.getArgb(a.neutralVariantPaletteKeyColor)}get background(){return this.getArgb(a.background)}get onBackground(){return this.getArgb(a.onBackground)}get surface(){return this.getArgb(a.surface)}get surfaceDim(){return this.getArgb(a.surfaceDim)}get surfaceBright(){return this.getArgb(a.surfaceBright)}get surfaceContainerLowest(){return this.getArgb(a.surfaceContainerLowest)}get surfaceContainerLow(){return this.getArgb(a.surfaceContainerLow)}get surfaceContainer(){return this.getArgb(a.surfaceContainer)}get surfaceContainerHigh(){return this.getArgb(a.surfaceContainerHigh)}get surfaceContainerHighest(){return this.getArgb(a.surfaceContainerHighest)}get onSurface(){return this.getArgb(a.onSurface)}get surfaceVariant(){return this.getArgb(a.surfaceVariant)}get onSurfaceVariant(){return this.getArgb(a.onSurfaceVariant)}get inverseSurface(){return this.getArgb(a.inverseSurface)}get inverseOnSurface(){return this.getArgb(a.inverseOnSurface)}get outline(){return this.getArgb(a.outline)}get outlineVariant(){return this.getArgb(a.outlineVariant)}get shadow(){return this.getArgb(a.shadow)}get scrim(){return this.getArgb(a.scrim)}get surfaceTint(){return this.getArgb(a.surfaceTint)}get primary(){return this.getArgb(a.primary)}get onPrimary(){return this.getArgb(a.onPrimary)}get primaryContainer(){return this.getArgb(a.primaryContainer)}get onPrimaryContainer(){return this.getArgb(a.onPrimaryContainer)}get inversePrimary(){return this.getArgb(a.inversePrimary)}get secondary(){return this.getArgb(a.secondary)}get onSecondary(){return this.getArgb(a.onSecondary)}get secondaryContainer(){return this.getArgb(a.secondaryContainer)}get onSecondaryContainer(){return this.getArgb(a.onSecondaryContainer)}get tertiary(){return this.getArgb(a.tertiary)}get onTertiary(){return this.getArgb(a.onTertiary)}get tertiaryContainer(){return this.getArgb(a.tertiaryContainer)}get onTertiaryContainer(){return this.getArgb(a.onTertiaryContainer)}get error(){return this.getArgb(a.error)}get onError(){return this.getArgb(a.onError)}get errorContainer(){return this.getArgb(a.errorContainer)}get onErrorContainer(){return this.getArgb(a.onErrorContainer)}get primaryFixed(){return this.getArgb(a.primaryFixed)}get primaryFixedDim(){return this.getArgb(a.primaryFixedDim)}get onPrimaryFixed(){return this.getArgb(a.onPrimaryFixed)}get onPrimaryFixedVariant(){return this.getArgb(a.onPrimaryFixedVariant)}get secondaryFixed(){return this.getArgb(a.secondaryFixed)}get secondaryFixedDim(){return this.getArgb(a.secondaryFixedDim)}get onSecondaryFixed(){return this.getArgb(a.onSecondaryFixed)}get onSecondaryFixedVariant(){return this.getArgb(a.onSecondaryFixedVariant)}get tertiaryFixed(){return this.getArgb(a.tertiaryFixed)}get tertiaryFixedDim(){return this.getArgb(a.tertiaryFixedDim)}get onTertiaryFixed(){return this.getArgb(a.onTertiaryFixed)}get onTertiaryFixedVariant(){return this.getArgb(a.onTertiaryFixedVariant)}};var j=class t{static of(e){return new t(e,!1)}static contentOf(e){return new t(e,!0)}static fromColors(e){return t.createPaletteFromColors(!1,e)}static contentFromColors(e){return t.createPaletteFromColors(!0,e)}static createPaletteFromColors(e,r){let n=new t(r.primary,e);if(r.secondary){let o=new t(r.secondary,e);n.a2=o.a1}if(r.tertiary){let o=new t(r.tertiary,e);n.a3=o.a1}if(r.error){let o=new t(r.error,e);n.error=o.a1}if(r.neutral){let o=new t(r.neutral,e);n.n1=o.n1}if(r.neutralVariant){let o=new t(r.neutralVariant,e);n.n2=o.n2}return n}constructor(e,r){let n=I.fromInt(e),o=n.hue,s=n.chroma;r?(this.a1=x.fromHueAndChroma(o,s),this.a2=x.fromHueAndChroma(o,s/3),this.a3=x.fromHueAndChroma(o+60,s/2),this.n1=x.fromHueAndChroma(o,Math.min(s/12,4)),this.n2=x.fromHueAndChroma(o,Math.min(s/6,8))):(this.a1=x.fromHueAndChroma(o,Math.max(48,s)),this.a2=x.fromHueAndChroma(o,16),this.a3=x.fromHueAndChroma(o+60,24),this.n1=x.fromHueAndChroma(o,4),this.n2=x.fromHueAndChroma(o,8)),this.error=x.fromHueAndChroma(25,84)}};var ut=class t{get primary(){return this.props.primary}get onPrimary(){return this.props.onPrimary}get primaryContainer(){return this.props.primaryContainer}get onPrimaryContainer(){return this.props.onPrimaryContainer}get secondary(){return this.props.secondary}get onSecondary(){return this.props.onSecondary}get secondaryContainer(){return this.props.secondaryContainer}get onSecondaryContainer(){return this.props.onSecondaryContainer}get tertiary(){return this.props.tertiary}get onTertiary(){return this.props.onTertiary}get tertiaryContainer(){return this.props.tertiaryContainer}get onTertiaryContainer(){return this.props.onTertiaryContainer}get error(){return this.props.error}get onError(){return this.props.onError}get errorContainer(){return this.props.errorContainer}get onErrorContainer(){return this.props.onErrorContainer}get background(){return this.props.background}get onBackground(){return this.props.onBackground}get surface(){return this.props.surface}get onSurface(){return this.props.onSurface}get surfaceVariant(){return this.props.surfaceVariant}get onSurfaceVariant(){return this.props.onSurfaceVariant}get outline(){return this.props.outline}get outlineVariant(){return this.props.outlineVariant}get shadow(){return this.props.shadow}get scrim(){return this.props.scrim}get inverseSurface(){return this.props.inverseSurface}get inverseOnSurface(){return this.props.inverseOnSurface}get inversePrimary(){return this.props.inversePrimary}static light(e){return t.lightFromCorePalette(j.of(e))}static dark(e){return t.darkFromCorePalette(j.of(e))}static lightContent(e){return t.lightFromCorePalette(j.contentOf(e))}static darkContent(e){return t.darkFromCorePalette(j.contentOf(e))}static lightFromCorePalette(e){return new t({primary:e.a1.tone(40),onPrimary:e.a1.tone(100),primaryContainer:e.a1.tone(90),onPrimaryContainer:e.a1.tone(10),secondary:e.a2.tone(40),onSecondary:e.a2.tone(100),secondaryContainer:e.a2.tone(90),onSecondaryContainer:e.a2.tone(10),tertiary:e.a3.tone(40),onTertiary:e.a3.tone(100),tertiaryContainer:e.a3.tone(90),onTertiaryContainer:e.a3.tone(10),error:e.error.tone(40),onError:e.error.tone(100),errorContainer:e.error.tone(90),onErrorContainer:e.error.tone(10),background:e.n1.tone(99),onBackground:e.n1.tone(10),surface:e.n1.tone(99),onSurface:e.n1.tone(10),surfaceVariant:e.n2.tone(90),onSurfaceVariant:e.n2.tone(30),outline:e.n2.tone(50),outlineVariant:e.n2.tone(80),shadow:e.n1.tone(0),scrim:e.n1.tone(0),inverseSurface:e.n1.tone(20),inverseOnSurface:e.n1.tone(95),inversePrimary:e.a1.tone(80)})}static darkFromCorePalette(e){return new t({primary:e.a1.tone(80),onPrimary:e.a1.tone(20),primaryContainer:e.a1.tone(30),onPrimaryContainer:e.a1.tone(90),secondary:e.a2.tone(80),onSecondary:e.a2.tone(20),secondaryContainer:e.a2.tone(30),onSecondaryContainer:e.a2.tone(90),tertiary:e.a3.tone(80),onTertiary:e.a3.tone(20),tertiaryContainer:e.a3.tone(30),onTertiaryContainer:e.a3.tone(90),error:e.error.tone(80),onError:e.error.tone(20),errorContainer:e.error.tone(30),onErrorContainer:e.error.tone(80),background:e.n1.tone(10),onBackground:e.n1.tone(90),surface:e.n1.tone(10),onSurface:e.n1.tone(90),surfaceVariant:e.n2.tone(30),onSurfaceVariant:e.n2.tone(80),outline:e.n2.tone(60),outlineVariant:e.n2.tone(30),shadow:e.n1.tone(0),scrim:e.n1.tone(0),inverseSurface:e.n1.tone(90),inverseOnSurface:e.n1.tone(20),inversePrimary:e.a1.tone(40)})}constructor(e){this.props=e}toJSON(){return ot({},this.props)}};var mt=class t extends R{constructor(e,r,n){super({sourceColorArgb:e.toInt(),variant:B.EXPRESSIVE,contrastLevel:n,isDark:r,primaryPalette:x.fromHueAndChroma(N(e.hue+240),40),secondaryPalette:x.fromHueAndChroma(R.getRotatedHue(e,t.hues,t.secondaryRotations),24),tertiaryPalette:x.fromHueAndChroma(R.getRotatedHue(e,t.hues,t.tertiaryRotations),32),neutralPalette:x.fromHueAndChroma(e.hue+15,8),neutralVariantPalette:x.fromHueAndChroma(e.hue+15,12)})}};mt.hues=[0,21,51,121,151,191,271,321,360];mt.secondaryRotations=[45,95,45,20,45,90,45,45,45];mt.tertiaryRotations=[120,120,20,45,20,15,20,120,120];var ft=class t extends R{constructor(e,r,n){super({sourceColorArgb:e.toInt(),variant:B.VIBRANT,contrastLevel:n,isDark:r,primaryPalette:x.fromHueAndChroma(e.hue,200),secondaryPalette:x.fromHueAndChroma(R.getRotatedHue(e,t.hues,t.secondaryRotations),24),tertiaryPalette:x.fromHueAndChroma(R.getRotatedHue(e,t.hues,t.tertiaryRotations),32),neutralPalette:x.fromHueAndChroma(e.hue,10),neutralVariantPalette:x.fromHueAndChroma(e.hue,12)})}};ft.hues=[0,41,61,101,131,181,251,301,360];ft.secondaryRotations=[18,15,10,12,15,18,15,12,12];ft.tertiaryRotations=[35,30,20,25,30,35,30,25,25];var _e={desired:4,fallbackColorARGB:4282549748,filter:!0};function Be(t,e){return t.score>e.score?-1:t.score<e.score?1:0}var W=class t{constructor(){}static score(e,r){let{desired:n,fallbackColorARGB:o,filter:s}=ot(ot({},_e),r),i=[],c=new Array(360).fill(0),l=0;for(let[g,y]of e.entries()){let C=I.fromInt(g);i.push(C);let b=Math.floor(C.hue);c[b]+=y,l+=y}let h=new Array(360).fill(0);for(let g=0;g<360;g++){let y=c[g]/l;for(let C=g-14;C<g+16;C++){let b=Pt(C);h[b]+=y}}let u=new Array;for(let g of i){let y=Pt(Math.round(g.hue)),C=h[y];if(s&&(g.chroma<t.CUTOFF_CHROMA||C<=t.CUTOFF_EXCITED_PROPORTION))continue;let b=C*100*t.WEIGHT_PROPORTION,k=g.chroma<t.TARGET_CHROMA?t.WEIGHT_CHROMA_BELOW:t.WEIGHT_CHROMA_ABOVE,M=(g.chroma-t.TARGET_CHROMA)*k,P=b+M;u.push({hct:g,score:P})}u.sort(Be);let m=[];for(let g=90;g>=15;g--){m.length=0;for(let{hct:y}of u)if(m.find(b=>xt(y.hue,b.hue)<g)||m.push(y),m.length>=n)break;if(m.length>=n)break}let p=[];m.length===0&&p.push(o);for(let g of m)p.push(g.toInt());return p}};W.TARGET_CHROMA=48;W.WEIGHT_PROPORTION=.7;W.WEIGHT_CHROMA_ABOVE=.3;W.WEIGHT_CHROMA_BELOW=.1;W.CUTOFF_CHROMA=5;W.CUTOFF_EXCITED_PROPORTION=.01;function kt(t){let e=Dt(t),r=It(t),n=Mt(t),o=[e.toString(16),r.toString(16),n.toString(16)];for(let[s,i]of o.entries())i.length===1&&(o[s]="0"+i);return"#"+o.join("")}function se(t){t=t.replace("#","");let e=t.length===3,r=t.length===6,n=t.length===8;if(!e&&!r&&!n)throw new Error("unexpected hex "+t);let o=0,s=0,i=0;return e?(o=J(t.slice(0,1).repeat(2)),s=J(t.slice(1,2).repeat(2)),i=J(t.slice(2,3).repeat(2))):r?(o=J(t.slice(0,2)),s=J(t.slice(2,4)),i=J(t.slice(4,6))):n&&(o=J(t.slice(2,4)),s=J(t.slice(4,6)),i=J(t.slice(6,8))),(255<<24|(o&255)<<16|(s&255)<<8|i&255)>>>0}function J(t){return parseInt(t,16)}function ie(t,e=[]){let r=j.of(t);return{source:t,schemes:{light:ut.light(t),dark:ut.dark(t)},palettes:{primary:r.a1,secondary:r.a2,tertiary:r.a3,neutral:r.n1,neutralVariant:r.n2,error:r.error},customColors:e.map(n=>Re(t,n))}}function Re(t,e){let r=e.value,n=r,o=t;e.blend&&(r=wt.harmonize(n,o));let i=j.of(r).a1;return{color:e,value:r,light:{color:i.tone(40),onColor:i.tone(100),colorContainer:i.tone(90),onColorContainer:i.tone(10)},dark:{color:i.tone(80),onColor:i.tone(20),colorContainer:i.tone(30),onColorContainer:i.tone(90)}}}var ce=t=>{let e=Number.parseInt(t.slice(1),16);return`${e>>16&255},${e>>8&255},${e&255}`},Oe="clr-surface",Le="clr-primary",He="clr-on-primary",ve="clr-on-surface",Ve={surface:{light:[99,98,95,90,80,70],dark:[6,12,20,24,28,38],prefix:Oe},primary:{light:[40,50,60,70,80,90],dark:[80,70,60,50,40,30],prefix:Le},"on-primary":{light:[6,12,20,24,28,38],dark:[99,95,90,80,70,60],prefix:He},"on-surface":{light:[6,12,20,24,28,38],dark:[99,95,90,80,70,60],prefix:ve}},St=(t,e)=>`--${t}: ${e};`;function Tt(t,e,r){let n=Ve[e];if(!n)return console.error(`Unknown scheme type: ${e}`),"";let o=r?n.dark:n.light,s=n.prefix;return o.map((i,c)=>{let l=kt(t.tone(i));return St(`${s}-${c}`,l)+St(`${s}-${c}-rgb`,ce(l))}).join("")}function Ne(t){let e="";for(let r in t){let n=t[r];if(typeof n=="number"){let o=r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),s=kt(n);e+=St(`clr-${o}`,s),e+=St(`clr-${o}-rgb`,ce(s))}}return e}function le(t,e={}){let{dark:r=!1,tonal:n=!0}=e,o=ie(se(t)),s=r?o.schemes.dark:o.schemes.light,i=n?o.palettes.neutralVariant:o.palettes.neutral,c=o.palettes.primary;return`${Ne(s.toJSON())}${Tt(i,"surface",r)}${Tt(i,"on-surface",r)}${Tt(c,"primary",r)}${Tt(c,"on-primary",r)}`}var ze=.08333333333333333,Ue=1/5,Ge=1/5;var Et=({pixels:t=64e3,distance:e=.22,colorValidator:r=(l,h,u,m)=>(m!=null?m:255)>250,hueDistance:n=ze,saturationDistance:o=Ge,lightnessDistance:s=Ue,crossOrigin:i="",requestMode:c="cors"}={})=>[Math.max(t,1),Math.min(Math.max(e,0),1),r,Math.min(Math.max(n,0),1),Math.min(Math.max(o,0),1),Math.min(Math.max(s,0),1),i,c],gt=class t{constructor(e,r,n,o=e<<16|r<<8|n){this._count=1,this.__saturation=-1,this.__hue=-1,this.__lightness=-1,this.__intensity=-1,this._red=e,this._green=r,this._blue=n,this._hex=o}static distance(e,r){return(Math.abs(r._red-e._red)+Math.abs(r._green-e._green)+Math.abs(r._blue-e._blue))/(3*255)}clone(){let e=new t(this._red,this._green,this._blue,this._hex);return e._count=this._count,e}updateHSL(){let e=this._red/255,r=this._green/255,n=this._blue/255,o=Math.max(e,r,n),s=Math.min(e,r,n);if(this.__lightness=(o+s)/2,o===s)this.__hue=0,this.__saturation=0,this.__intensity=0;else{let i=o-s;switch(this.__saturation=this.__lightness>.5?i/(2-o-s):i/(o+s),this.__intensity=this.__saturation*((.5-Math.abs(.5-this.__lightness))*2),o){case e:this.__hue=((r-n)/i+(r<n?6:0))/6;break;case r:this.__hue=((n-e)/i+2)/6;break;case n:this.__hue=((e-r)/i+4)/6;break}}}get _hue(){return this.__hue===-1&&this.updateHSL(),this.__hue}get _saturation(){return this.__saturation===-1&&this.updateHSL(),this.__saturation}get _lightness(){return this.__lightness===-1&&this.updateHSL(),this.__lightness}get _intensity(){return this.__intensity===-1&&this.updateHSL(),this.__intensity}},zt=class{constructor(){this._count=0,this._children={}}addColor(e,r,n,o){return this._count++,this._children[e]?this._children[e]._count++:this._children[e]=new gt(r,n,o,e),this._children[e]}getList(){return Object.keys(this._children).map(e=>this._children[e])}createMainColor(){let n=this.getList().reduce((o,s)=>o._count>=s._count?o:s).clone();return n._count=this._count,n}},Ut=class{constructor(){this._count=0,this._children={}}getList(){return Object.keys(this._children).map(e=>this._children[e])}addColor(e,r,n){let o=e<<16|r<<8|n,s=(e>>4&15)<<8|(r>>4&15)<<4|n>>4&15;return this._count++,this.getLeafGroup(s).addColor(o,e,r,n)}getLeafGroup(e){return this._children[e]||(this._children[e]=new zt),this._children[e]}getColors(e){let r=this.getList().map(o=>o.createMainColor());r.sort((o,s)=>s._count-o._count);let n=[];for(;r.length;){let o=r.shift();r.filter(s=>gt.distance(o,s)<e).forEach(s=>{o._count+=s._count;let i=r.findIndex(c=>c===s);r.splice(i,1)}),n.push(o)}return n}},qt=({data:t,width:e,height:r},n,o,s)=>{let i=new Ut,c=e&&r&&Math.floor(e*r/n)||1,l=0;for(let h=0;h<t.length;h+=4*c){let u=t[h],m=t[h+1],p=t[h+2],g=t[h+3];s(u,m,p,g)?i.addColor(u,m,p):l++}return{colors:i.getColors(o),count:i._count+l}},Ft=(t,e)=>Math.abs(t-e),$e=(t,e)=>Math.min(Ft(t,e),Ft((t+.5)%1,(e+.5)%1)),Gt=class{constructor(){this.colors=[],this._average=null}addColor(e){this.colors.push(e),this._average=null}isSamePalette(e,r,n,o){for(let s of this.colors)if(!($e(s._hue,e._hue)<r&&Ft(s._saturation,e._saturation)<n&&Ft(s._lightness,e._lightness)<o))return!1;return!0}get average(){if(!this._average){let{r:e,g:r,b:n}=this.colors.reduce((s,i)=>(s.r+=i._red,s.g+=i._green,s.b+=i._blue,s),{r:0,g:0,b:0}),o=this.colors.reduce((s,i)=>s+i._count,0);this._average=new gt(Math.round(e/this.colors.length),Math.round(r/this.colors.length),Math.round(n/this.colors.length)),this._average._count=o}return this._average}},$t=class{constructor(e,r,n){this._groups=[],this._hue=e,this._saturation=r,this._lightness=n}addColor(e){let r=this._groups.find(n=>n.isSamePalette(e,this._hue,this._saturation,this._lightness));if(r)r.addColor(e);else{let n=new Gt;n.addColor(e),this._groups.push(n)}}getGroups(){return this._groups.map(e=>e.average)}},qe=(t,e,r,n,o)=>{let s=new $t(r,n,o);t.forEach(c=>s.addColor(c));let i=s.getGroups();return i.sort((c,l)=>{let h=(l._intensity+.1)*(.9-l._count/e),u=(c._intensity+.1)*(.9-c._count/e);return h-u}),i},je=(t,e)=>({hex:`#${"0".repeat(6-t._hex.toString(16).length)}${t._hex.toString(16)}`,red:t._red,green:t._green,blue:t._blue,area:t._count/e,hue:t._hue,saturation:t._saturation,lightness:t._lightness,intensity:t._intensity}),Xe=()=>typeof window<"u"&&typeof window.document<"u",jt=()=>typeof self=="object"&&self.constructor&&self.constructor.name==="DedicatedWorkerGlobalScope",_t=()=>typeof window>"u"&&typeof process<"u"&&process.versions!=null&&process.versions.node!=null,Xt=(t,e,r,n,o)=>qe(t,e,r,n,o).map(i=>je(i,e)),he=(t,e)=>{let r=t.width*t.height,n=r<e?t.width:Math.round(t.width*Math.sqrt(e/r)),o=r<e?t.height:Math.round(t.height*Math.sqrt(e/r)),i=((c,l)=>{if(jt())return new OffscreenCanvas(c,l);let h=document.createElement("canvas");return h.width=c,h.height=l,h})(n,o).getContext("2d");return i.drawImage(t,0,0,t.width,t.height,0,0,n,o),i.getImageData(0,0,n,o)},Vt=(t,e={})=>{let[r,n,o,s,i,c]=Et(e),{colors:l,count:h}=qt(t,r,n,o);return Xt(l,h,s,i,c)},ue=async(t,e={})=>{if(_t())return[];let[r,n,o,s,i,c,l]=Et(e);return t.crossOrigin=l,new Promise(h=>{let u=m=>{let p=he(m,r),{colors:g,count:y}=qt(p,r,n,o);h(Xt(g,y,s,i,c))};if(t.complete)u(t);else{let m=()=>{t.removeEventListener("load",m),u(t)};t.addEventListener("load",m)}})},Ye=async(t,e={})=>{if(_t())return[];let[r,n,o,s,i,c]=Et(e),l=he(t,r),{colors:h,count:u}=qt(l,r,n,o);return Xt(h,u,s,i,c)},Nt=async(t,e={})=>{if(_t())return[];if(jt()){let n=Et(e),s=await(await fetch(t,{mode:n[7]})).blob(),i=await createImageBitmap(s),c=await Ye(i,e);return i.close(),c}let r=new Image;return r.src=t,ue(r,e)},me=(t,e)=>{if(Xe()){if(t instanceof Image)return ue(t,e);if(t instanceof ImageData||t instanceof Object&&t.data)return new Promise(r=>{r(Vt(t,e))});if(typeof t=="string")return Nt(t,e)}if(jt()){if(t instanceof ImageData||t instanceof Object&&t.data)return new Promise(r=>{r(Vt(t,e))});if(typeof t=="string")return Nt(t,e);if(t.src)return Nt(t.src,e)}if(_t())return new Promise(r=>{r(Vt(t,e))});throw new Error("Can not analyse picture")};var fe=100,Q={};function We(){let t=Object.keys(Q);if(t.length>fe){t.sort((r,n)=>Q[r].timestamp-Q[n].timestamp);let e=t.length-fe;for(let r=0;r<e;r++)delete Q[t[r]]}}async function ge(t,e){if(Q[t])return Q[t].timestamp=Date.now(),Q[t].hex;try{let o=(await me(t,e))[0].hex;return Q[t]={hex:o,timestamp:Date.now()},We(),o}catch(r){return console.error("Error extracting color.",r),null}}var Je="colorCacheDB",Ke=1,tt="colors",Ze=24*60*60*1e3,pt=null;function Yt(){return pt||(pt=new Promise((t,e)=>{let r=indexedDB.open(Je,Ke);r.onerror=n=>{console.error("IndexedDB open error:",n),e(n),pt=null},r.onsuccess=n=>{let o=n.target.result;t(o)},r.onupgradeneeded=n=>{let o=n.target.result;o.objectStoreNames.contains(tt)||o.createObjectStore(tt,{keyPath:"key"})}}),pt)}async function pe(t){let e=await Yt();return new Promise((r,n)=>{let i=e.transaction(tt,"readonly").objectStore(tt).get(t);i.onsuccess=c=>{let l=c.target.result;l&&l.expiry>Date.now()?r(l.color):(r(null),l&&Qe(t).catch(console.error))},i.onerror=c=>{console.error("IndexedDB get error:",c),n(c)}})}async function de(t,e){let r=await Yt();return new Promise((n,o)=>{let i=r.transaction(tt,"readwrite").objectStore(tt),c=Date.now()+Ze,l={key:t,color:e,expiry:c},h=i.put(l);h.onsuccess=()=>n(),h.onerror=u=>{console.error("IndexedDB put error:",u),o(u)}})}async function Qe(t){let e=await Yt();return new Promise((r,n)=>{let i=e.transaction(tt,"readwrite").objectStore(tt).delete(t);i.onsuccess=()=>r(),i.onerror=c=>{console.error("IndexedDB delete error:",c),n(c)}})}self.addEventListener("message",async t=>{try{let e="#1bc858",r=null,n=null;t.data.type==="image"?(n=t.data.options.url,r=await pe(n),r||(r=await ge(t.data.options.url,{requestMode:"cors"}),r&&await de(n,r))):(n=t.data.options.hex,r=await pe(n),r||(r=t.data.options.hex,r&&await de(n,r)));let o={style:le(r!=null?r:e,{dark:t.data.options.isDark,tonal:t.data.options.isTonal}),color:r};self.postMessage({success:!0,message:"Colors generated Successfully.",data:o})}catch(e){self.postMessage({success:!1,message:e.message})}});})();
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
