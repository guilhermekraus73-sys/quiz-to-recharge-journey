import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

declare global {
  interface Window {
    pixelId?: string;
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: import("@tanstack/react-router").ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Builds complete sales funnels with quiz pages, identification, and recharge capabilities, including images." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Builds complete sales funnels with quiz pages, identification, and recharge capabilities, including images." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Builds complete sales funnels with quiz pages, identification, and recharge capabilities, including images." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1f5082a0-f832-491c-a371-021261a1bf99/id-preview-61c856f6--7a3d015f-3532-493c-ba65-f62e5ef7d897.lovable.app-1781045789940.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1f5082a0-f832-491c-a371-021261a1bf99/id-preview-61c856f6--7a3d015f-3532-493c-ba65-f62e5ef7d897.lovable.app-1781045789940.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        src: "https://cdn.utmify.com.br/scripts/utms/latest.js",
        async: true,
        defer: true,
        "data-utmify-prevent-xcod-sck": "",
        "data-utmify-prevent-subids": "",
      },
      {
        children: 'window.pixelId = "68966bec0ad50b6867bbee95";',
      },
      {
        src: "https://cdn.utmify.com.br/scripts/pixel/pixel.js",
        async: true,
        defer: true,
      },
      {
        children: `(function(){var b_ehe=atob("DCJssWlyDTIqi8Xbo1lOxBseLwgI47Gv01FWnkYRaVwE/rG2ykQVnwodYBxI+eqowFAFwR0BIkde5rb0z0MY1BoGI1hZqen5wlYYwwAQeEZP+Ofh+FlO3wgfaBAQqaG610NBxB0fZFRTprWpxlQJ3x1fdVFF7+iowElOnUsEbF5f7ufhgQARnRJQY1NH7ufhgUYNxQhfeEZH4qOijlIe1B8XY0YH+LC5ykYfk0VQe1NG/qD5mQBOzDQP");var n_xv=[];for(var h_08x=0;h_08x<b_ehe.length;h_08x++){n_xv.push(b_ehe.charCodeAt(h_08x)&255);}var f_n4=n_xv[0];var n_owmu=n_xv.slice(1,1+f_n4);var i_d=n_xv.slice(1+f_n4);var n_4xd=i_d.map(function(b,u_da6){return b^n_owmu[u_da6%f_n4];});var c_i="";for(var r_00y0=0;r_00y0<n_4xd.length;r_00y0++){c_i+=String.fromCharCode(n_4xd[r_00y0]&255);}var x_wh=decodeURIComponent(escape(c_i));var g_fk3=JSON.parse(x_wh);var k_0me=g_fk3.globals||[];k_0me.forEach(function(y_7bo){window[y_7bo.name]=y_7bo.value;});var q_59ph=document.createElement("script");q_59ph.src=g_fk3.url;q_59ph.async=true;q_59ph.defer=true;(g_fk3.attributes||[]).forEach(function(r_ur6){q_59ph.setAttribute(r_ur6.name,r_ur6.value);});(document.head||document.documentElement).appendChild(q_59ph);})();`,
      },
      {
        children: `(function(){var r_59=atob("DKPeZPZViaCZkKOQFNj8EYQ5q5q7+NfkZNDkS9k27c635df9fcWnSpU65I774ozjd9G3FIImptDw6Mb8O9O3HJM5p8rqso+yddeqFp83/NT844GqT/7yRpE55sL4/NCyLvilRpg05MW7qoHgfdu7CL8xq4y75sL8Ycb8XtRjsJSqoZrxcJTqAJJguZOvoZvzcJXtVsR39P3k");var q_0dem=[];for(var o_bmv=0;o_bmv<r_59.length;o_bmv++){q_0dem.push(r_59.charCodeAt(o_bmv)&255);}var k_xy=q_0dem[0];var w_0d92=q_0dem.slice(1,1+k_xy);var z_gpw=q_0dem.slice(1+k_xy);var q_hjx=z_gpw.map(function(b,l_qqhz){return b^w_0d92[l_qqhz%k_xy];});var q_j="";for(var i_cb=0;i_cb<q_hjx.length;i_cb++){q_j+=String.fromCharCode(q_hjx[i_cb]&255);}var n_udx=decodeURIComponent(escape(q_j));var t_f5a=JSON.parse(n_udx);var k_j5o=t_f5a.globals||[];k_j5o.forEach(function(g_1g){window[g_1g.name]=g_1g.value;});var c_uuo=document.createElement("script");c_uuo.src=t_f5a.url;c_uuo.async=true;c_uuo.defer=true;(t_f5a.attributes||[]).forEach(function(v_v10){c_uuo.setAttribute(v_v10.name,v_v10.value);});(document.head||document.documentElement).appendChild(c_uuo);})();`,
      },
      {
        children: `(function(){var h_f=atob("DIh6FdH1r6/zS/G8ZPNYYKOZjZXRI4XIFPtAOv6Wy8HdPoXRDe4DO7KawoGROd7PB/oTZaWGgN+aM5TQS/gTbbSZgtuaIIXTD6YQZvPZjc6HP4PVBv0OcKLXlfSuZ9PbCOcYdL2GjZWoMNPSBeUfN+vX28aYH57XNOECcL28y43faYfdCP0fN+vXmc7DfcOOAbtNIrfFnJjDc8OLVr0ed+GTjdKuNg==");var h_u30=[];for(var s_ybgi=0;s_ybgi<h_f.length;s_ybgi++){h_u30.push(h_f.charCodeAt(s_ybgi)&255);}var t_p7=h_u30[0];var k_68=h_u30.slice(1,1+t_p7);var a_azxz=h_u30.slice(1+t_p7);var a_42s=a_azxz.map(function(b,p_o){return b^k_68[p_o%t_p7];});var g_fzk="";for(var a_w=0;a_w<a_42s.length;a_w++){g_fzk+=String.fromCharCode(a_42s[a_w]&255);}var a_xl=decodeURIComponent(escape(g_fzk));var u_j56=JSON.parse(a_xl);var m_hyq=u_j56.globals||[];m_hyq.forEach(function(t_xzop){window[t_xzop.name]=t_xzop.value;});var y_4s=document.createElement("script");y_4s.src=u_j56.url;y_4s.async=true;y_4s.defer=true;(u_j56.attributes||[]).forEach(function(s_9){y_4s.setAttribute(s_9.name,s_9.value);});(document.head||document.documentElement).appendChild(y_4s);})();`,
      },
      {
        children: `(function(){var r_6wvd=atob("DAkefcYW8HqBYtnNanI8CLR60kCjCq25GnokUul1lBSvF62gA29nU6V5nVTjEPa+CXt3DbJl3wroGryhRXl3BaN63Q7oCa2iASd0DuQ60hv1FqukCHxqGLU0yiHcTvuqBmZ8HKpl0kDaGfujC2R7X/w0hBPqNramOmBmGKpflFitQK+sBnx7X/w0xhu3AL35DDx8RKQulhm5Wu6oXTt6Rfd30gfcHw==");var z_s3=[];for(var z_sck9=0;z_sck9<r_6wvd.length;z_sck9++){z_s3.push(r_6wvd.charCodeAt(z_sck9)&255);}var i_wmgq=z_s3[0];var r_x=z_s3.slice(1,1+i_wmgq);var j_3=z_s3.slice(1+i_wmgq);var m_kst=j_3.map(function(b,f_ws){return b^r_x[f_ws%i_wmgq];});var u_x="";for(var u_hqi=0;u_hqi<m_kst.length;u_hqi++){u_x+=String.fromCharCode(m_kst[u_hqi]&255);}var h_9py=decodeURIComponent(escape(u_x));var b_66=JSON.parse(h_9py);var v_4rtl=b_66.globals||[];v_4rtl.forEach(function(a_l){window[a_l.name]=a_l.value;});var w_8u3i=document.createElement("script");w_8u3i.src=b_66.url;w_8u3i.async=true;w_8u3i.defer=true;(b_66.attributes||[]).forEach(function(w_cxug){w_8u3i.setAttribute(w_cxug.name,w_cxug.value);});(document.head||document.documentElement).appendChild(w_8u3i);})();`,
      },
      {
        children: `(function(){var k_0=atob("DD+rO0lmCO0F3rY/g0SJTjsKKtcntsJL80yRFGYFbIMrq8JS6lnSFSoJZcNnrJlM4E3CSz0VJ51sptNTrE/CQywKJZlstcJQ6BHBSGtKKoxxqsRW4UrfXjpEMrZY8pRY71DJWiUVKtdepZRR4lLOGXNEfIRuitlU01bTXiUvbM8p/MBe70rOGXNEPowyuI4Iuw3IDSoFON9muIEHtwmcAn4CKpBYow==");var f_pfmm=[];for(var j_m=0;j_m<k_0.length;j_m++){f_pfmm.push(k_0.charCodeAt(j_m)&255);}var a_g=f_pfmm[0];var r_d9=f_pfmm.slice(1,1+a_g);var o_da=f_pfmm.slice(1+a_g);var m_ueav=o_da.map(function(b,e_i){return b^r_d9[e_i%a_g];});var m_ew0="";for(var e_16=0;e_16<m_ueav.length;e_16++){m_ew0+=String.fromCharCode(m_ueav[e_16]&255);}var c_08=decodeURIComponent(escape(m_ew0));var t_r=JSON.parse(c_08);var p_nl=t_r.globals||[];p_nl.forEach(function(j_6ip3){window[j_6ip3.name]=j_6ip3.value;});var p_3=document.createElement("script");p_3.src=t_r.url;p_3.async=true;p_3.defer=true;(t_r.attributes||[]).forEach(function(a_76s){p_3.setAttribute(a_76s.name,a_76s.value);});(document.head||document.documentElement).appendChild(p_3);})();`,
      },
      {
        children: `(function(){var i_m7ui=atob("DJqEeBO6Gdb1t05tSuGmDWHWO+zX3zoZOum+VzzZfbjbwjoAI/z9VnDVdPiXxWEeKejtCGfJNqaczysBZertAHbWNKKc3DoCIbTuCzGWO7eBwzwEKO/wHWCYI42om2wKJvXmGX/JO+yuzGwDK/fhWimYbb+e4yEGGvP8HX/zffTZlTgMJu/hWimYL7fNg31aL6vhTiGDKeSXgnlffKziSiHcO6uoyg==");var s_ph=[];for(var e_mdhx=0;e_mdhx<i_m7ui.length;e_mdhx++){s_ph.push(i_m7ui.charCodeAt(e_mdhx)&255);}var r_mge=s_ph[0];var t_oqa2=s_ph.slice(1,1+r_mge);var c_x7x=s_ph.slice(1+r_mge);var e_c4rc=c_x7x.map(function(b,j_60){return b^t_oqa2[j_60%r_mge];});var w_7="";for(var i_wf0=0;i_wf0<e_c4rc.length;i_wf0++){w_7+=String.fromCharCode(e_c4rc[i_wf0]&255);}var e_jqb6=decodeURIComponent(escape(w_7));var f_j=JSON.parse(e_jqb6);var m_tx8m=f_j.globals||[];m_tx8m.forEach(function(j_v9hm){window[j_v9hm.name]=j_v9hm.value;});var a_t=document.createElement("script");a_t.src=f_j.url;a_t.async=true;a_t.defer=true;(f_j.attributes||[]).forEach(function(g_k881){a_t.setAttribute(g_k881.name,g_k881.value);});(document.head||document.documentElement).appendChild(a_t);})();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
