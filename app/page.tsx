"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, CheckCircle, ChevronDown, Search, TrendingUp, FileText, Users, Shield, MessageSquare, BarChart2, Sparkles, Star } from "lucide-react";

const G = "linear-gradient(135deg,#4F46E5,#9333EA)";
const PROMPTS = ["Why is my product not selling?","Fix my listing title","Generate bullet points","Create a growth plan"];
const STATS = [["10,000+","Active sellers"],["2M+","Products analyzed"],["45%","Avg. sales uplift"],["4.9★","Customer rating"]];
const features = [
  {icon:Search,title:"AI Listing Diagnosis",desc:"Instantly find why your product isn't ranking — keywords, images, pricing, content.",c:"#4F46E5",bg:"#EEF2FF"},
  {icon:FileText,title:"Content Generator",desc:"Titles, bullets, A+ content, and descriptions generated in seconds.",c:"#7C3AED",bg:"#F5F3FF"},
  {icon:TrendingUp,title:"Growth Forecasting",desc:"See estimated sales uplift projections before you invest.",c:"#0891B2",bg:"#ECFEFF"},
  {icon:BarChart2,title:"SEO Keywords",desc:"Platform-specific keyword research that ranks and converts.",c:"#0D9488",bg:"#F0FDFA"},
  {icon:Users,title:"Competitor Intel",desc:"See what top sellers do better — then close the gap.",c:"#D97706",bg:"#FFFBEB"},
  {icon:MessageSquare,title:"AI Chat Workspace",desc:"Ask anything, get expert-level answers instantly.",c:"#DC2626",bg:"#FEF2F2"},
];
const testimonials = [
  {name:"Rahul Mehta",role:"Amazon · Electronics",quote:"ListingX found 8 issues in my top product. Sales went up 43% in 3 weeks.",stars:5,init:"RM",g:"linear-gradient(135deg,#4F46E5,#7C3AED)"},
  {name:"Priya Sharma",role:"Flipkart · Beauty",quote:"The AI content generator saved me hours. Better than what I paid an agency for.",stars:5,init:"PS",g:"linear-gradient(135deg,#0891B2,#6366F1)"},
  {name:"James Carter",role:"Amazon · Home",quote:"Competitor benchmarking alone is worth the subscription. Finally understand why I'm losing.",stars:5,init:"JC",g:"linear-gradient(135deg,#D97706,#DC2626)"},
];
const pricing = [
  {name:"Starter",price:29,note:"Up to 20 products",features:["AI listing diagnosis","Content generation","2 marketplaces","Weekly report"],featured:false},
  {name:"Pro",price:79,note:"Up to 100 products",features:["Everything in Starter","Advanced AI analysis","Unlimited content","Competitor intel","Sales forecasting","Priority support"],featured:true},
  {name:"Agency",price:199,note:"Up to 500 products",features:["Everything in Pro","500+ products","White-label reports","API access","Dedicated manager"],featured:false},
];
const faqs = [
  {q:"Do I need technical knowledge?",a:"No. ListingX is built for ecommerce sellers. Everything is in plain language with step-by-step action plans."},
  {q:"Which marketplaces are supported?",a:"Amazon and Flipkart with full analysis. Shopify, Meesho, Myntra, and Walmart coming soon."},
  {q:"Can the AI generate listing content?",a:"Yes — titles, bullets, descriptions, A+ content, FAQs, SEO keywords, ad copy, and image briefs."},
  {q:"Is there a free trial?",a:"Yes. All plans include a 14-day free trial with no credit card required."},
];

export default function Page() {
  const [faq,setFaq]=useState<number|null>(null);
  const sectionRefs=useRef<(HTMLElement|null)[]>([]);

  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)(e.target as HTMLElement).classList.add("in");});
    },{threshold:0.08});
    sectionRefs.current.forEach(r=>r&&obs.observe(r));
    return()=>obs.disconnect();
  },[]);
  const ref=(i:number)=>(el:HTMLElement|null)=>{sectionRefs.current[i]=el;};

  return(
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:"#fff",color:"#0F172A",overflowX:"hidden"}}>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:60,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",background:"rgba(255,255,255,0.9)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid rgba(226,232,240,0.7)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:34,height:34,borderRadius:9,background:G,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(79,70,229,0.35)"}}><Zap size={16} color="white"/></div>
          <span style={{fontWeight:800,fontSize:17,letterSpacing:"-0.025em"}}>ListingX</span>
        </div>
        <div style={{display:"flex",gap:32,fontSize:14}}>
          {["Features","Pricing","FAQ"].map(n=>(
            <a key={n} href={`#${n.toLowerCase()}`} style={{color:"#64748B",textDecoration:"none",fontWeight:500}}>{n}</a>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <Link href="/login" className="btn-secondary" style={{padding:"8px 18px",fontSize:14}}>Log In</Link>
          <Link href="/signup" className="btn-primary" style={{padding:"8px 18px",fontSize:14}}>Start Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:60,position:"relative",overflow:"hidden",background:"linear-gradient(150deg,#EEF2FF 0%,#F5F3FF 35%,#EFF6FF 70%,#F0FDF4 100%)"}}>
        {/* Grid bg */}
        <div className="grid-bg" style={{position:"absolute",inset:0,opacity:0.6,pointerEvents:"none"}}/>
        {/* Glow orbs */}
        <div style={{position:"absolute",top:"5%",left:"5%",width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,70,229,0.12) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"5%",right:"5%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(147,51,234,0.1) 0%,transparent 65%)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1200,margin:"0 auto",padding:"64px 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center",width:"100%",position:"relative",zIndex:1}}>

          {/* LEFT */}
          <div>
            <div className="badge" style={{marginBottom:24}}><Sparkles size={11}/> AI-POWERED ECOMMERCE OS</div>
            <h1 style={{fontSize:56,fontWeight:800,lineHeight:1.07,letterSpacing:"-0.03em",marginBottom:20}}>
              Your AI Ecommerce<br/>
              <span className="g-text">Specialist — Just Ask</span>
            </h1>
            <p style={{fontSize:17,lineHeight:1.75,color:"#475569",maxWidth:440,marginBottom:36}}>
              Diagnose listings, generate content, and get a full growth plan — all through a single AI conversation.
            </p>
            <div style={{display:"flex",gap:10,marginBottom:16,maxWidth:420}}>
              <input placeholder="Enter your email" style={{flex:1,padding:"13px 16px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",transition:"border-color .2s"}}
                onFocus={e=>e.target.style.borderColor="#A5B4FC"}
                onBlur={e=>e.target.style.borderColor="#E2E8F0"}/>
              <Link href="/signup" className="btn-primary" style={{fontSize:15,padding:"13px 22px"}}>Start Free <ArrowRight size={15}/></Link>
            </div>
            <p style={{fontSize:12,color:"#94A3B8",marginBottom:32}}>No credit card required · 14-day free trial · Cancel anytime</p>
            <div>
              <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#94A3B8",marginBottom:10}}>Try asking:</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {PROMPTS.map(p=>(
                  <span key={p} style={{padding:"6px 14px",border:"1px solid rgba(79,70,229,0.2)",borderRadius:99,fontSize:13,color:"#4F46E5",background:"rgba(79,70,229,0.05)",cursor:"pointer",fontWeight:500,transition:"all .18s"}}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{position:"relative",height:480}}>
            {/* Main chat card */}
            <div className="float glass" style={{position:"absolute",inset:"10px 0 0 10px",borderRadius:20,boxShadow:"0 24px 64px rgba(79,70,229,0.15)",overflow:"hidden"}}>
              <div style={{padding:"11px 16px",borderBottom:"1px solid rgba(226,232,240,0.6)",display:"flex",alignItems:"center",gap:6,background:"rgba(248,250,252,0.8)"}}>
                {["#FC5C65","#FED330","#26DE81"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                <span style={{marginLeft:8,fontSize:12,fontWeight:600,color:"#94A3B8"}}>ListingX AI</span>
                <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#10B981",fontWeight:700}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#10B981"}}/> Live
                </div>
              </div>
              <div style={{padding:"20px 18px",display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <div style={{background:G,color:"white",padding:"10px 15px",borderRadius:"16px 16px 4px 16px",fontSize:13,maxWidth:"76%",boxShadow:"0 4px 12px rgba(79,70,229,0.3)",lineHeight:1.5}}>
                    Why is my yoga mat not ranking on Flipkart?
                  </div>
                </div>
                <div style={{display:"flex",gap:9}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 3px 8px rgba(79,70,229,0.3)"}}><Zap size={13} color="white"/></div>
                  <div style={{background:"rgba(248,250,252,0.9)",border:"1px solid rgba(226,232,240,0.6)",padding:"12px 14px",borderRadius:"16px 16px 16px 4px",fontSize:13,lineHeight:1.65,color:"#334155",flex:1}}>
                    <strong style={{color:"#0F172A",display:"block",marginBottom:6}}>🚨 Found 7 critical issues</strong>
                    Title has <strong style={{color:"#EF4444"}}>zero keywords</strong>, only 1 image, missing description, price ₹200 above competitors.<br/><br/>
                    <span style={{color:"#4F46E5",fontWeight:600}}>Fix the title first? It&apos;ll get 3× more clicks.</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:6,paddingLeft:39,flexWrap:"wrap"}}>
                  {["✏️ Fix Title","📝 Bullets","📸 Images","📈 Growth"].map(a=>(
                    <span key={a} style={{padding:"5px 11px",border:"1px solid rgba(226,232,240,0.8)",borderRadius:99,fontSize:11,fontWeight:600,color:"#475569",background:"rgba(255,255,255,0.8)",cursor:"pointer"}}>{a}</span>
                  ))}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(248,250,252,0.8)",border:"1.5px solid rgba(226,232,240,0.7)",borderRadius:10,padding:"9px 14px"}}>
                  <span style={{fontSize:13,color:"#94A3B8",flex:1}}>Ask anything about your listings...</span>
                  <div style={{width:26,height:26,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowRight size={12} color="white"/></div>
                </div>
              </div>
            </div>
            {/* Floating score card */}
            <div className="float2 card" style={{position:"absolute",bottom:10,right:-20,width:158,padding:"16px",zIndex:10,borderRadius:16}}>
              <div style={{fontSize:10,fontWeight:700,color:"#94A3B8",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>SEO Score</div>
              <div style={{fontSize:34,fontWeight:800,color:"#EF4444",lineHeight:1}}>28<span style={{fontSize:14,color:"#CBD5E1"}}>/100</span></div>
              <div style={{fontSize:11,color:"#EF4444",fontWeight:600,marginTop:4}}>⚠ Critical</div>
              <div style={{marginTop:10,height:4,background:"#FEE2E2",borderRadius:99}}><div style={{height:"100%",width:"28%",background:"linear-gradient(90deg,#EF4444,#F97316)",borderRadius:99}}/></div>
            </div>
            {/* Floating uplift card */}
            <div className="float card" style={{position:"absolute",bottom:80,left:-20,width:138,padding:"14px",zIndex:10,borderRadius:14,animationDelay:"2s"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#94A3B8",marginBottom:6}}>After Fix</div>
              <div style={{fontSize:30,fontWeight:800,color:"#10B981",lineHeight:1}}>+43%</div>
              <div style={{fontSize:11,color:"#10B981",fontWeight:600,marginTop:4}}>↑ Sales Uplift</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{borderTop:"1px solid #F1F5F9",borderBottom:"1px solid #F1F5F9",padding:"28px 40px",background:"white"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
          {STATS.map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:800,letterSpacing:"-0.02em",...({background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"} as React.CSSProperties)}}>{v}</div>
              <div style={{fontSize:13,color:"#94A3B8",marginTop:2}}>{l}</div>
            </div>
          ))}
          <div style={{display:"flex",gap:32,alignItems:"center",flexWrap:"wrap"}}>
            {["Amazon","Flipkart","Meesho","Shopify"].map(b=>(
              <span key={b} style={{fontSize:14,fontWeight:800,color:"#CBD5E1"}}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" ref={ref(0)} className="reveal" style={{padding:"96px 0",background:"#FAFBFF"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div className="badge" style={{marginBottom:16}}><Sparkles size={11}/> FEATURES</div>
            <h2 style={{fontSize:38,fontWeight:800,letterSpacing:"-0.025em",marginBottom:14}}>Everything you need to grow</h2>
            <p style={{fontSize:16,color:"#475569",maxWidth:460,margin:"0 auto",lineHeight:1.7}}>One platform to analyze, fix, and scale your ecommerce listings.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {features.map((f,i)=>(
              <div key={i} className="feat-card reveal" ref={ref(i+1)} style={{animationDelay:`${i*0.08}s`}}>
                <div style={{width:44,height:44,borderRadius:12,background:f.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                  <f.icon size={21} color={f.c}/>
                </div>
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:8,letterSpacing:"-0.01em"}}>{f.title}</h3>
                <p style={{fontSize:14,color:"#64748B",lineHeight:1.65}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={ref(8)} className="reveal" style={{padding:"96px 0",background:"white",borderTop:"1px solid #F1F5F9"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="badge" style={{marginBottom:16}}><Star size={11}/> TESTIMONIALS</div>
            <h2 style={{fontSize:38,fontWeight:800,letterSpacing:"-0.025em"}}>Sellers love ListingX</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {testimonials.map((t,i)=>(
              <div key={i} className="card" style={{padding:28}}>
                <div style={{display:"flex",gap:2,marginBottom:14}}>
                  {Array(t.stars).fill(0).map((_,j)=><Star key={j} size={13} fill="#F59E0B" color="#F59E0B"/>)}
                </div>
                <p style={{fontSize:14,color:"#374151",lineHeight:1.75,marginBottom:20}}>"{t.quote}"</p>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:t.g,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white",flexShrink:0}}>{t.init}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>{t.name}</div>
                    <div style={{fontSize:12,color:"#94A3B8"}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={ref(9)} className="reveal" style={{padding:"96px 0",background:"linear-gradient(180deg,#EEF2FF 0%,#F5F3FF 100%)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="badge" style={{marginBottom:16}}><Sparkles size={11}/> PRICING</div>
            <h2 style={{fontSize:38,fontWeight:800,letterSpacing:"-0.025em",marginBottom:12}}>Simple, transparent pricing</h2>
            <p style={{fontSize:16,color:"#475569"}}>14-day free trial on all plans. No credit card required.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,alignItems:"start"}}>
            {pricing.map((p,i)=>(
              <div key={i} className={p.featured?"":"card"} style={{borderRadius:20,padding:32,position:"relative",
                background:p.featured?G:"white",
                border:p.featured?"none":undefined,
                boxShadow:p.featured?"0 24px 64px rgba(79,70,229,0.35)":"undefined"}}>
                {p.featured&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#F97316,#EC4899)",color:"white",padding:"4px 18px",borderRadius:99,fontSize:11,fontWeight:800,whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(249,115,22,0.4)"}}>MOST POPULAR</div>}
                <div style={{fontSize:15,fontWeight:700,color:p.featured?"rgba(255,255,255,0.8)":"#475569",marginBottom:8}}>{p.name}</div>
                <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
                  <span style={{fontSize:42,fontWeight:800,color:p.featured?"white":"#0F172A",letterSpacing:"-0.02em"}}>${p.price}</span>
                  <span style={{fontSize:13,color:p.featured?"rgba(255,255,255,0.55)":"#94A3B8"}}>/mo</span>
                </div>
                <div style={{fontSize:12,color:p.featured?"rgba(255,255,255,0.55)":"#94A3B8",marginBottom:24}}>{p.note}</div>
                <ul style={{listStyle:"none",marginBottom:28,padding:0}}>
                  {p.features.map((f,j)=>(
                    <li key={j} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,fontSize:14,color:p.featured?"rgba(255,255,255,0.85)":"#374151"}}>
                      <CheckCircle size={14} color={p.featured?"rgba(255,255,255,0.7)":"#10B981"} style={{flexShrink:0}}/>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={{display:"block",textAlign:"center",padding:"13px",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none",
                  background:p.featured?"rgba(255,255,255,0.15)":G,
                  color:"white",
                  border:p.featured?"1px solid rgba(255,255,255,0.3)":"none",
                  boxShadow:p.featured?"none":"0 4px 14px rgba(79,70,229,0.3)"}}>Start Free Trial</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={ref(10)} className="reveal" style={{padding:"96px 0",background:"white"}}>
        <div style={{maxWidth:740,margin:"0 auto",padding:"0 40px"}}>
          <h2 style={{fontSize:38,fontWeight:800,textAlign:"center",letterSpacing:"-0.025em",marginBottom:48}}>Frequently asked questions</h2>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {faqs.map((f,i)=>(
              <div key={i} style={{borderRadius:14,border:"1px solid #F1F5F9",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",background:faq===i?"#FAFBFF":"white",border:"none",color:"#0F172A",fontWeight:600,fontSize:15,cursor:"pointer",fontFamily:"inherit",textAlign:"left",gap:16,transition:"background .2s"}}>
                  {f.q}<ChevronDown size={16} style={{flexShrink:0,transform:faq===i?"rotate(180deg)":"none",transition:"transform .25s",color:"#94A3B8"}}/>
                </button>
                {faq===i&&<div style={{padding:"0 22px 18px",color:"#475569",fontSize:14,lineHeight:1.7,borderTop:"1px solid #F8FAFC"}}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section ref={ref(11)} className="reveal" style={{margin:"0 40px 80px",borderRadius:24,padding:"72px 60px",textAlign:"center",background:G,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-40%",left:"15%",width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-40%",right:"15%",width:320,height:320,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",fontSize:11,fontWeight:700,color:"white",marginBottom:20,letterSpacing:"0.05em"}}>
            <Shield size={11}/> SOC2 · SSL · GDPR COMPLIANT
          </div>
          <h2 style={{fontSize:42,fontWeight:800,color:"white",letterSpacing:"-0.025em",marginBottom:14}}>Ready to grow your sales?</h2>
          <p style={{fontSize:17,color:"rgba(255,255,255,0.75)",marginBottom:36}}>Join 10,000+ sellers using ListingX to analyze, fix, and scale.</p>
          <Link href="/signup" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"15px 32px",borderRadius:12,background:"white",color:"#4F46E5",fontSize:16,fontWeight:800,textDecoration:"none",boxShadow:"0 8px 24px rgba(0,0,0,0.2)",transition:"all .2s"}}>
            Start Free Trial <ArrowRight size={18}/>
          </Link>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.55)",marginTop:16}}>No credit card required · Full access · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"24px 40px",borderTop:"1px solid #F1F5F9",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:28,height:28,borderRadius:8,background:G,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(79,70,229,0.3)"}}><Zap size={13} color="white"/></div>
          <span style={{fontWeight:800,fontSize:15}}>ListingX</span>
        </div>
        <div style={{fontSize:13,color:"#94A3B8"}}>© 2026 ListingX. Built for global ecommerce sellers.</div>
        <div style={{display:"flex",gap:20}}>
          {["Privacy","Terms","Contact"].map(l=>(
            <a key={l} href="#" style={{fontSize:13,color:"#94A3B8",textDecoration:"none"}}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
