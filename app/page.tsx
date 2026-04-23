"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, CheckCircle, Star, ChevronDown, Search, TrendingUp, FileText, Users, Shield, MessageSquare, BarChart2, Sparkles } from "lucide-react";

const G = "linear-gradient(135deg,#4F46E5,#9333EA)";
const PROMPTS = ["Why is my product not selling?","Fix my listing title","Generate bullet points","Create a growth plan"];
const faqs = [
  {q:"Do I need technical knowledge?",a:"No. ListingX is built for ecommerce sellers. Everything is in plain language with step-by-step action plans."},
  {q:"Which marketplaces are supported?",a:"Amazon and Flipkart with full analysis. Shopify, Meesho, Myntra, and Walmart are coming soon."},
  {q:"Can the AI generate listing content?",a:"Yes — titles, bullets, descriptions, A+ content, FAQs, SEO keywords, ad copy, and image briefs."},
  {q:"Is there a free trial?",a:"Yes. All plans include a 14-day free trial with no credit card required."},
];
const features = [
  {icon:Search,title:"AI Listing Diagnosis",desc:"Find exactly why your product isn't selling in seconds.",c:"#4F46E5"},
  {icon:FileText,title:"Content Generator",desc:"Titles, bullets, A+ content generated instantly.",c:"#9333EA"},
  {icon:TrendingUp,title:"Growth Forecasting",desc:"See estimated sales uplift before you invest.",c:"#EC4899"},
  {icon:BarChart2,title:"SEO Keywords",desc:"Platform-specific keywords that rank and convert.",c:"#06B6D4"},
  {icon:Users,title:"Competitor Intel",desc:"See what top sellers do better and close the gap.",c:"#10B981"},
  {icon:MessageSquare,title:"AI Chat Workspace",desc:"Ask anything — get instant expert-level answers.",c:"#F97316"},
];
const pricing = [
  {name:"Starter",price:29,note:"Up to 20 products",features:["AI listing diagnosis","Content generation","2 marketplaces","Weekly report"],featured:false},
  {name:"Pro",price:79,note:"Up to 100 products",features:["Everything in Starter","Advanced AI analysis","Unlimited content","Competitor intel","Sales forecasting","Priority support"],featured:true},
  {name:"Agency",price:199,note:"Up to 500 products",features:["Everything in Pro","500+ products","White-label reports","API access","Dedicated manager"],featured:false},
];

export default function Page() {
  const [faq,setFaq] = useState<number|null>(null);
  const [email,setEmail] = useState("");
  const refs = useRef<(HTMLElement|null)[]>([]);

  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); });
    },{threshold:0.1});
    refs.current.forEach(r=>r && obs.observe(r));
    return ()=>obs.disconnect();
  },[]);

  const sr = (i:number)=>(el:HTMLElement|null)=>{ refs.current[i]=el; };

  return (
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:"#fff",color:"#0F172A",overflowX:"hidden"}}>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:60,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",background:"rgba(255,255,255,0.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(226,232,240,0.8)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:34,height:34,borderRadius:10,background:G,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(79,70,229,0.35)"}}><Zap size={16} color="white"/></div>
          <span style={{fontWeight:800,fontSize:17,letterSpacing:"-0.02em"}}>ListingX</span>
        </div>
        <div style={{display:"flex",gap:28,fontSize:14}}>
          {["Features","Pricing","FAQ"].map(n=>(
            <a key={n} href={`#${n.toLowerCase()}`} style={{color:"#475569",textDecoration:"none",fontWeight:500,transition:"color .2s"}}
              onMouseEnter={e=>(e.currentTarget.style.color="#0F172A")}
              onMouseLeave={e=>(e.currentTarget.style.color="#475569")}>{n}</a>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <Link href="/login" style={{padding:"8px 18px",borderRadius:8,fontSize:14,fontWeight:600,color:"#475569",textDecoration:"none",border:"1px solid #E2E8F0",background:"white"}}>Log In</Link>
          <Link href="/signup" style={{padding:"8px 18px",borderRadius:8,fontSize:14,fontWeight:700,color:"white",textDecoration:"none",background:G,boxShadow:"0 3px 10px rgba(79,70,229,0.3)"}}>Start Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:60,position:"relative",overflow:"hidden",background:"linear-gradient(145deg,#F0F2FF 0%,#FAF5FF 40%,#EFF6FF 100%)"}}>
        {/* BG glows */}
        <div style={{position:"absolute",top:"-10%",left:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,70,229,0.15) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-5%",right:"-5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(147,51,234,0.12) 0%,transparent 70%)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center",width:"100%",position:"relative",zIndex:1}}>
          {/* LEFT */}
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:99,background:"rgba(79,70,229,0.08)",border:"1px solid rgba(79,70,229,0.2)",fontSize:12,fontWeight:700,color:"#4F46E5",marginBottom:24,letterSpacing:"0.02em"}}>
              <Sparkles size={12}/> AI-POWERED ECOMMERCE OS
            </div>
            <h1 style={{fontSize:54,fontWeight:800,lineHeight:1.07,letterSpacing:"-0.03em",marginBottom:20}}>
              Your AI Ecommerce<br/>
              <span style={{background:G,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Specialist — Just Ask</span>
            </h1>
            <p style={{fontSize:17,lineHeight:1.75,color:"#475569",maxWidth:440,marginBottom:32}}>
              Diagnose listings, generate content, and get a full growth plan — all through a single AI conversation.
            </p>
            {/* Email CTA */}
            <div style={{display:"flex",gap:8,marginBottom:20,maxWidth:440}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" style={{flex:1,padding:"13px 16px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)"}}/>
              <Link href="/signup" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"13px 20px",borderRadius:10,background:G,color:"white",fontSize:14,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap",boxShadow:"0 4px 14px rgba(79,70,229,0.35)",transition:"all .2s"}}
                className="btn-glow">Start Free <ArrowRight size={14}/></Link>
            </div>
            <p style={{fontSize:12,color:"#94A3B8",marginBottom:28}}>No credit card required · 14-day free trial · Cancel anytime</p>
            <div>
              <p style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#94A3B8",marginBottom:10}}>Try asking:</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {PROMPTS.map(p=>(
                  <span key={p} style={{padding:"6px 14px",border:"1px solid rgba(79,70,229,0.15)",borderRadius:99,fontSize:13,color:"#4F46E5",background:"rgba(79,70,229,0.04)",cursor:"pointer",fontWeight:500}}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — floating cards */}
          <div style={{position:"relative",height:480}}>
            {/* Main card */}
            <div className="float" style={{position:"absolute",top:20,left:20,right:20,background:"rgba(255,255,255,0.85)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.9)",borderRadius:20,boxShadow:"0 24px 64px rgba(79,70,229,0.15)",overflow:"hidden"}}>
              {/* Chrome */}
              <div style={{padding:"10px 16px",borderBottom:"1px solid #F1F5F9",display:"flex",alignItems:"center",gap:6,background:"rgba(248,250,252,0.9)"}}>
                {["#FC5C65","#FED330","#26DE81"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                <span style={{marginLeft:8,fontSize:12,fontWeight:600,color:"#94A3B8"}}>ListingX AI</span>
                <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#10B981",fontWeight:700}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#10B981"}}/> Live
                </div>
              </div>
              <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <div style={{background:G,color:"white",padding:"10px 15px",borderRadius:"16px 16px 4px 16px",fontSize:13,maxWidth:"76%",boxShadow:"0 4px 12px rgba(79,70,229,0.25)",lineHeight:1.5}}>
                    Why is my yoga mat not ranking on Flipkart?
                  </div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 3px 8px rgba(79,70,229,0.3)"}}><Zap size={13} color="white"/></div>
                  <div style={{background:"rgba(248,250,252,0.95)",border:"1px solid #F1F5F9",padding:"12px 14px",borderRadius:"16px 16px 16px 4px",fontSize:13,lineHeight:1.65,color:"#334155",flex:1}}>
                    <strong style={{color:"#0F172A",display:"block",marginBottom:6}}>🚨 Found 7 critical issues</strong>
                    Title has <strong style={{color:"#EF4444"}}>zero keywords</strong>, only 1 image, no description, pricing ₹200 above competitors.<br/><br/>
                    <span style={{color:"#4F46E5",fontWeight:600}}>Shall I fix the title first? It&apos;ll get 3× more clicks.</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:6,paddingLeft:38,flexWrap:"wrap"}}>
                  {["✏️ Fix Title","📝 Bullets","📸 Images","📈 Growth"].map(a=>(
                    <span key={a} style={{padding:"5px 12px",border:"1px solid #E2E8F0",borderRadius:99,fontSize:11,fontWeight:600,color:"#475569",background:"white",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>{a}</span>
                  ))}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,background:"#F8FAFC",border:"1.5px solid #E2E8F0",borderRadius:10,padding:"9px 14px"}}>
                  <span style={{fontSize:13,color:"#94A3B8",flex:1}}>Ask anything about your listings...</span>
                  <div style={{width:26,height:26,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowRight size={12} color="white"/></div>
                </div>
              </div>
            </div>

            {/* Floating score card */}
            <div className="float-delay card-hover" style={{position:"absolute",bottom:0,right:-10,width:160,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.9)",borderRadius:16,padding:16,boxShadow:"0 16px 40px rgba(0,0,0,0.1)",zIndex:10}}>
              <div style={{fontSize:11,fontWeight:700,color:"#94A3B8",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>SEO Score</div>
              <div style={{fontSize:36,fontWeight:800,color:"#EF4444",lineHeight:1}}>28<span style={{fontSize:16,color:"#94A3B8"}}>/100</span></div>
              <div style={{fontSize:11,color:"#EF4444",fontWeight:600,marginTop:4}}>⚠️ Critical</div>
              <div style={{marginTop:10,height:4,background:"#FEE2E2",borderRadius:99,overflow:"hidden"}}>
                <div style={{height:"100%",width:"28%",background:"linear-gradient(90deg,#EF4444,#F97316)",borderRadius:99}}/>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="float card-hover" style={{position:"absolute",bottom:60,left:-10,width:140,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.9)",borderRadius:14,padding:14,boxShadow:"0 16px 40px rgba(0,0,0,0.08)",zIndex:10}}>
              <div style={{fontSize:11,fontWeight:700,color:"#94A3B8",marginBottom:6}}>After Fix</div>
              <div style={{fontSize:28,fontWeight:800,color:"#10B981",lineHeight:1}}>+43%</div>
              <div style={{fontSize:11,color:"#10B981",fontWeight:600,marginTop:4}}>↑ Sales Uplift</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <div style={{borderTop:"1px solid #F1F5F9",borderBottom:"1px solid #F1F5F9",padding:"24px 40px",background:"white",textAlign:"center"}}>
        <p style={{fontSize:13,color:"#94A3B8",marginBottom:16,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Trusted by 10,000+ sellers on</p>
        <div style={{display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap"}}>
          {["Amazon","Flipkart","Meesho","Shopify","Myntra"].map(b=>(
            <span key={b} style={{fontSize:16,fontWeight:800,color:"#CBD5E1",letterSpacing:"-0.01em"}}>{b}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" ref={sr(0)} className="section-fade" style={{padding:"96px 0",background:"linear-gradient(180deg,#FAFBFF 0%,#fff 100%)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:99,background:"rgba(79,70,229,0.07)",border:"1px solid rgba(79,70,229,0.15)",fontSize:12,fontWeight:700,color:"#4F46E5",marginBottom:16}}>
              <Sparkles size={12}/> FEATURES
            </div>
            <h2 style={{fontSize:36,fontWeight:800,letterSpacing:"-0.02em",marginBottom:12}}>Everything you need to grow</h2>
            <p style={{fontSize:16,color:"#475569",maxWidth:480,margin:"0 auto"}}>One platform to analyze, fix, and scale your ecommerce listings.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {features.map((f,i)=>(
              <div key={i} className="card-hover" style={{background:"white",border:"1px solid #F1F5F9",borderRadius:16,padding:28,boxShadow:"0 2px 12px rgba(0,0,0,0.04)",transition:"all .25s"}}>
                <div style={{width:44,height:44,borderRadius:12,background:`${f.c}12`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                  <f.icon size={20} color={f.c}/>
                </div>
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>{f.title}</h3>
                <p style={{fontSize:14,color:"#64748B",lineHeight:1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={sr(1)} className="section-fade" style={{padding:"96px 0",background:"linear-gradient(180deg,#F0F2FF 0%,#FAF5FF 100%)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:99,background:"rgba(79,70,229,0.07)",border:"1px solid rgba(79,70,229,0.15)",fontSize:12,fontWeight:700,color:"#4F46E5",marginBottom:16}}><Sparkles size={12}/> PRICING</div>
            <h2 style={{fontSize:36,fontWeight:800,letterSpacing:"-0.02em",marginBottom:12}}>Simple, transparent pricing</h2>
            <p style={{fontSize:16,color:"#475569"}}>14-day free trial on all plans. No credit card required.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,alignItems:"start"}}>
            {pricing.map(p=>(
              <div key={p.name} className="card-hover" style={{borderRadius:20,padding:32,position:"relative",background:p.featured?"linear-gradient(135deg,#4F46E5,#7C3AED)":"white",border:p.featured?"none":"1px solid #E8EAFF",boxShadow:p.featured?"0 20px 60px rgba(79,70,229,0.3)":"0 4px 16px rgba(0,0,0,0.05)"}}>
                {p.featured && <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#F97316,#EC4899)",color:"white",padding:"4px 16px",borderRadius:99,fontSize:11,fontWeight:800,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
                <div style={{fontSize:15,fontWeight:700,color:p.featured?"rgba(255,255,255,0.85)":"#475569",marginBottom:8}}>{p.name}</div>
                <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
                  <span style={{fontSize:40,fontWeight:800,color:p.featured?"white":"#0F172A"}}>${p.price}</span>
                  <span style={{fontSize:13,color:p.featured?"rgba(255,255,255,0.6)":"#94A3B8"}}>/mo</span>
                </div>
                <div style={{fontSize:12,color:p.featured?"rgba(255,255,255,0.6)":"#94A3B8",marginBottom:24}}>{p.note}</div>
                <ul style={{listStyle:"none",marginBottom:28,padding:0}}>
                  {p.features.map(f=>(
                    <li key={f} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,fontSize:14,color:p.featured?"rgba(255,255,255,0.85)":"#475569"}}>
                      <CheckCircle size={14} color={p.featured?"rgba(255,255,255,0.8)":"#10B981"} style={{flexShrink:0}}/>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={{display:"block",textAlign:"center",padding:"12px",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none",background:p.featured?"rgba(255,255,255,0.15)":"linear-gradient(135deg,#4F46E5,#9333EA)",color:"white",border:p.featured?"1px solid rgba(255,255,255,0.3)":"none",boxShadow:p.featured?"none":"0 4px 12px rgba(79,70,229,0.3)"}}>Start Free Trial</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={sr(2)} className="section-fade" style={{padding:"96px 0",background:"white"}}>
        <div style={{maxWidth:760,margin:"0 auto",padding:"0 40px"}}>
          <h2 style={{fontSize:36,fontWeight:800,textAlign:"center",letterSpacing:"-0.02em",marginBottom:48}}>Frequently asked questions</h2>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {faqs.map((f,i)=>(
              <div key={i} style={{borderRadius:14,border:"1px solid #F1F5F9",overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.03)"}}>
                <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",background:faq===i?"#FAFBFF":"white",border:"none",color:"#0F172A",fontWeight:600,fontSize:15,cursor:"pointer",fontFamily:"inherit",textAlign:"left",gap:16}}>
                  {f.q}<ChevronDown size={16} style={{flexShrink:0,transform:faq===i?"rotate(180deg)":"none",transition:"transform .25s",color:"#94A3B8"}}/>
                </button>
                {faq===i && <div style={{padding:"0 22px 18px",color:"#475569",fontSize:14,lineHeight:1.7,borderTop:"1px solid #F8FAFC"}}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={sr(3)} className="section-fade" style={{padding:"80px 40px",textAlign:"center",background:"linear-gradient(135deg,#4F46E5 0%,#7C3AED 50%,#9333EA 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-30%",left:"20%",width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-30%",right:"20%",width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:99,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",fontSize:12,fontWeight:700,color:"white",marginBottom:24}}>
            <Shield size={12}/> SOC2 · SSL · GDPR
          </div>
          <h2 style={{fontSize:40,fontWeight:800,color:"white",letterSpacing:"-0.02em",marginBottom:16}}>Ready to grow your sales?</h2>
          <p style={{fontSize:17,color:"rgba(255,255,255,0.8)",marginBottom:36}}>Join 10,000+ sellers using ListingX to analyze, fix, and scale.</p>
          <Link href="/signup" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 32px",borderRadius:12,background:"white",color:"#4F46E5",fontSize:16,fontWeight:800,textDecoration:"none",boxShadow:"0 8px 24px rgba(0,0,0,0.2)"}}>
            Start Free Trial <ArrowRight size={18}/>
          </Link>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginTop:16}}>No credit card required · Full access · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"24px 40px",borderTop:"1px solid #F1F5F9",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16,background:"white"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,borderRadius:7,background:G,display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={13} color="white"/></div>
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
