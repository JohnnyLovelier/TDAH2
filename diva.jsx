import { useState, useEffect, useRef } from "react";

const P = { p:"#e8609c", pl:"#f4a5c7", pd:"#c94882", ac:"#f9c8d9", bg:"#fff5f8", bgd:"#ffeef3", cb:"#fcd5e3", tx:"#5c2142", tm:"#b07090", tl:"#d4a0b8", ch:"#d4a0e0", yes:"#22c55e", no:"#ef4444", yesD:"#16a34a", noD:"#dc2626" };

const A_Q=["Avez-vous souvent du mal à prêter attention aux détails, ou faites-vous souvent des erreurs d'étourderie dans votre travail ou dans d'autres activités ?","Trouvez-vous souvent difficile de soutenir votre attention sur une tâche ?","Donnez-vous souvent l'impression de ne pas écouter lorsqu'on vous parle directement ?","Avez-vous souvent du mal à vous conformer aux consignes et à mener à terme vos tâches domestiques ou vos obligations professionnelles ?","Trouvez-vous souvent difficile d'organiser les tâches ou les activités ?","Évitez-vous souvent les tâches qui nécessitent un effort mental soutenu ?","Perdez-vous souvent les objets nécessaires à votre travail ou vos activités ?","Vous laissez-vous facilement distraire par des stimuli externes ?","Avez-vous des oublis fréquents dans la vie quotidienne ?"];
const A_AD=[["Fait des erreurs d'étourderie","Travaille lentement pour éviter les erreurs","Ne lit pas les instructions avec soin","Du mal à travailler de façon minutieuse","Besoin de trop de temps pour mener à leur terme des tâches complexes","Facilement empêtré par les détails","Travaille trop rapidement et commet ainsi des erreurs"],["Incapable de maintenir son attention sur des tâches pendant longtemps","Facilement distrait par ses propres pensées ou associations d'idées","Difficile de suivre un film jusqu'à la fin, ou de lire un livre","Rapidement ennuyé par les choses","Pose des questions sur des sujets déjà discutés"],["Rêveur ou préoccupé","Du mal à se concentrer pendant une conversation","Après-coup, ne se rappelle pas du sujet d'une conversation","Change souvent de sujet dans une conversation","D'autres personnes vous disent que vos pensées sont ailleurs"],["Fait plusieurs tâches en même temps sans les terminer","Du mal à finir les tâches une fois que la nouveauté a diminué","Besoin de fixer un délai pour terminer les tâches","Du mal à terminer les tâches administratives","Du mal à suivre les instructions dans un manuel"],["Du mal à planifier les activités de la vie quotidienne","La maison ou l'espace de travail est en désordre","Planifie trop de tâches ou planification inefficace","Prévoit régulièrement de faire plusieurs choses au même moment","Arrive en retard","Incapable d'utiliser un agenda de manière efficace","Rigide par nécessité de coller au programme","Faible conscience du temps","Établit des listes sans les utiliser","Besoin qu'un tiers structure les choses"],["Fait en premier les choses les plus faciles ou les plus agréables","Remet à plus tard les tâches ennuyeuses ou difficiles","Remet à plus tard les choses jusqu'à dépasser les délais","Évite les tâches monotones, comme les tâches administratives","N'aime pas lire à cause de l'effort mental","Évite des tâches qui demandent beaucoup de concentration"],["Égare portefeuille, clés, ou agenda","Oublie des choses en quittant un lieu","Perd des papiers pour son travail","Perd beaucoup de temps à chercher des choses","Panique si des gens ont changé des choses de place","Range les choses au mauvais endroit","Perd des notes, listes ou numéros de téléphone"],["Du mal à ignorer des stimuli externes","Du mal à reprendre les choses après avoir été distrait","Facilement distrait par des bruits ou des événements","Facilement distrait par une conversation entre d'autres personnes","Du mal à filtrer et/ou sélectionner des informations"],["Oublie des rendez-vous ou des obligations","Oublie les clés, l'agenda, etc.","A besoin de rappels fréquents concernant les rendez-vous","Retourne sur ses pas pour prendre des choses oubliées","Utilise des programmes rigides pour être sûr de ne rien oublier","Ne tient pas à jour son agenda et/ou oublie de consulter son agenda"]];
const A_CH=[["Erreurs d'étourderie lors du travail scolaire","Erreurs parce qu'il ne lisait pas les questions correctement","Ne répondait pas à des questions parce qu'il ne les lisait pas correctement","Ne répondait pas aux questions posées au verso d'un examen","Les autres faisaient remarquer que le travail n'était pas soigné","Ne vérifiait pas ses réponses dans les devoirs scolaires","Besoin de trop de temps pour mener à leur terme des tâches minutieuses"],["Du mal à maintenir l'attention lors du travail scolaire","Du mal à maintenir l'attention sur un jeu","Facilement distrait","Du mal à se concentrer","Besoin d'un environnement structuré pour ne pas être distrait","Rapidement ennuyé dans des activités"],["Ne sait plus ce que les parents/enseignants ont dit","Rêveur ou préoccupé","N'écoute qu'avec un contact visuel ou lorsque le ton est élevé","Doit souvent être interpelé","Les questions doivent être répétées"],["Du mal à suivre les instructions","En difficulté lorsque les tâches comprennent plusieurs étapes successives","Ne termine pas les choses","Ne termine pas les devoirs ou ne les rend pas","Besoin d'un environnement structuré pour pouvoir terminer les tâches"],["Du mal à être prêt à temps","Chambre ou bureau en désordre","Du mal à jouer seul","Du mal à planifier des tâches ou ses devoirs","Fait les choses de manière confuse","Arrive en retard","Faible conscience du temps","Du mal à s'occuper seul"],["Évite des devoirs ou aversion pour les devoirs","Lit peu de livres ou n'aime pas lire à cause de l'effort mental","Évite des tâches qui demandent beaucoup de concentration","Déteste les sujets scolaires qui demandent beaucoup de concentration","Remet à plus tard les tâches ennuyeuses ou difficiles"],["Perd l'agenda, les stylos, les affaires de gymnastique ou d'autres choses","Égare des jouets, habits ou devoirs scolaires","Perd beaucoup de temps à chercher des choses","Panique si des gens ont changé des choses de place","Les parents et/ou les enseignants font remarquer qu'il a perdu des choses"],["En classe, il regarde souvent dehors","Facilement distrait par des bruits ou des événements","Du mal à reprendre les choses après avoir été distrait"],["Oublie des rendez-vous ou des consignes","On doit souvent lui rappeler les choses","S'arrête en chemin parce qu'il a oublié ce qu'il devait faire","Oublie d'apporter des affaires scolaires","Oublie des choses à l'école ou chez des amis"]];
const HI_Q=["Remuez-vous souvent les mains ou les pieds, ou vous tortillez-vous souvent sur votre siège ?","Vous levez-vous souvent dans des situations où vous êtes supposé rester assis ?","Vous sentez-vous souvent agité(e) ?","Trouvez-vous souvent difficile de profiter d'un moment de détente ?","Êtes-vous souvent « sur la brèche » ou comme si vous étiez « dirigé(e) par un moteur » ?","Parlez-vous souvent trop ?","Laissez-vous souvent échapper la réponse à une question qui n'est pas encore entièrement posée ?","Trouvez-vous souvent difficile d'attendre votre tour ?","Interrompez-vous souvent les autres ou imposez-vous votre présence ?"];
const HI_AD=[["Du mal à rester assis immobile","Remue les jambes","Tape avec un stylo ou joue avec un objet","Tortille les cheveux ou ronge les ongles","Capable de contrôler l'agitation mais cela vous stresse"],["Évite les réunions, les conférences, les cérémonies religieuses, etc.","Préfère marcher plutôt que rester assis","Ne reste jamais longtemps assis tranquille, bouge sans cesse","Stressé par l'obligation de rester assis","Trouve une excuse pour pouvoir marcher"],["Se sent agité ou nerveux à l'intérieur","Ressent constamment le sentiment d'avoir quelque chose à faire","Trouve difficile de se relaxer"],["Parle lorsque cela n'est pas approprié","Se met rapidement en avant en public","Bruyant dans tout type de situations","Du mal à faire des activités tranquillement","Du mal à parler doucement"],["Toujours occupé à faire quelque chose","Déborde d'énergie, toujours en mouvement","Franchit ses propres limites","Lâche difficilement prise, excessivement insistant"],["Parle tellement que les gens trouvent cela fatiguant","Connu pour parler de manière incessante","Trouve difficile d'arrêter de parler","Tendance à trop parler","Ne laisse pas l'occasion aux autres d'intervenir dans une conversation","Besoin de beaucoup de mots pour dire quelque chose"],["Dit ce qu'il pense","Dit les choses sans réfléchir","Donne des réponses avant que les gens aient fini de parler","Finit les phrases des autres","Manque de tact"],["Difficulté à attendre dans une file, veut doubler","Du mal à attendre patiemment dans la circulation","Du mal à attendre son tour dans les conversations","Impatient","Rapidement commence ou met terme à des relations ou des emplois par impatience"],["Rapide à interférer avec les autres","Interrompt les autres","Dérange sans qu'on lui ait rien demandé","Les autres font remarquer qu'il est intrusif","Du mal à respecter les limites des autres","A une opinion sur tout et la donne immédiatement"]];
const HI_CH=[["Les parents disent souvent « tiens-toi tranquille »","Remue les jambes","Tape avec un stylo ou joue avec un objet","Tortille les cheveux ou ronge les ongles","Incapable de rester assis de façon relaxée","Capable de contrôler l'agitation mais cela vous stressait"],["Se lève souvent pendant les repas ou en classe","Trouve très difficile de rester assis en classe ou pendant les repas","On lui dit souvent de rester assis","Trouve une excuse pour pouvoir marcher"],["Court toujours","Grimpe sur les meubles ou saute sur les fauteuils","Monte aux arbres","Se sent agité à l'intérieur"],["Fait du bruit en jouant ou en classe","Incapable de regarder la TV ou un film tranquillement","On lui demande souvent de se calmer ou d'être plus tranquille","Se met rapidement en avant en public"],["Constamment occupé","Remarqué par son activité en classe ou à la maison","Déborde d'énergie","Toujours sur la brèche, monté sur ressorts"],["Connu comme une « boîte à paroles »","Les enfants ou les enseignants demandent souvent le silence","Les fiches scolaires mentionnent souvent des bavardages","Puni pour avoir trop parlé","Gêne le travail scolaire des autres en parlant trop","Ne laisse pas les autres parler dans une conversation"],["Dit les choses sans réfléchir","Veut être le premier à répondre aux questions en classe","Donne la première réponse qui lui vient à l'esprit","Interrompt les autres avant que les phrases soient finies","Blesse verbalement (manque de tact)"],["Du mal à attendre son tour dans les sports ou les jeux","Du mal à attendre son tour en classe","Toujours le premier à parler ou agir","Rapidement impatient","Traverse la route sans regarder"],["S'immisce dans les jeux des autres","Interrompt les conversations des autres","Réagit sur tout","Incapable d'attendre"]];

const mkItems=(qs,ads,chs)=>qs.map((q,i)=>({id:qs===A_Q?`A${i+1}`:`HI${i+1}`,question:q,adult:ads[i],child:chs[i]}));
const INAT=mkItems(A_Q,A_AD,A_CH), HYPER=mkItems(HI_Q,HI_AD,HI_CH);

const IMP_AD={work:{label:"Travail / Éducation",items:["N'a pas atteint le niveau d'étude pour le travail voulu","Travaille en deçà du niveau d'étude","Rapidement fatigué d'un lieu de travail","Succession de plusieurs emplois à court terme","Difficulté avec le travail administratif/la planification","N'obtient pas de promotions","Sous-performant au travail","A quitté un emploi ou a été renvoyé après une dispute","Arrêts de travail ou invalidité liés aux symptômes","Retentissement limité par compensation par un fort niveau intellectuel","Retentissement limité par compensation par la structure externe"]},rel:{label:"Relations et/ou Famille",items:["Rapidement fatigué par les relations","Débute/termine impulsivement les relations","Compensation nécessaire des symptômes par le conjoint","Problèmes relationnels, nombreuses disputes, manque d'intimité","Divorce à cause des symptômes","Problèmes sexuels à cause des symptômes","Problèmes avec l'éducation à cause des symptômes","Difficultés ménagères et/ou administratives","Problèmes financiers ou jeux d'argent","N'ose pas commencer une relation"]},soc:{label:"Contacts sociaux",items:["Rapidement fatigué par les contacts sociaux","Difficulté à maintenir des contacts sociaux","Conflits résultant de problèmes de communication","Difficulté à initier des contacts sociaux","Faible auto-affirmation de soi","Inattention (oubli d'envoyer une carte, d'être empathique, etc.)"]},lei:{label:"Temps libre / Hobby",items:["Incapable de se relaxer complètement pendant le temps libre","Obligé de pratiquer beaucoup de sport pour se relaxer","Blessures à la suite d'une pratique excessive du sport","Incapable de terminer un livre ou de regarder un film jusqu'au bout","Fatigué parce qu'affairé en permanence","Rapidement lassé par les hobbies","Accidents ou suspension de permis de conduire","Recherche de sensations et/ou prise trop fréquente de risques","Problèmes avec la police/la justice","Hyperphagie"]},self:{label:"Confiance en soi / Image de soi",items:["Doute de lui-même suite aux remarques négatives des autres","Image de soi négative à cause des échecs du passé","Peur de l'échec en commençant de nouvelles choses","Réaction excessive aux critiques","Perfectionnisme","Affecté par les symptômes du TDAH"]}};
const IMP_CH={edu:{label:"Éducation",items:["Niveau d'études inférieur à celui prédit par le QI","Redoublement à cause de problèmes de concentration","Études inachevées / Renvoi d'un établissement scolaire","Plus d'années pour terminer les études que nécessaire","A obtenu un niveau d'étude conforme au QI mais avec beaucoup de difficultés","Difficulté à faire les devoirs","Éducation spéciale à cause des symptômes","Commentaires des enseignants sur le comportement ou la concentration","Retentissement limité par compensation par un fort niveau intellectuel","Retentissement limité par compensation par la structure externe"]},fam:{label:"Famille",items:["Disputes fréquentes avec frères et sœurs","Punitions ou corrections fréquentes","Peu de contacts avec la famille à cause des conflits","A nécessité le soutien des parents pour une période plus longue que la normale"]},soc:{label:"Contacts sociaux",items:["Difficulté à maintenir des contacts sociaux","Conflits résultant de problèmes de communication","Difficulté à initier des contacts sociaux","Faible auto-affirmation de soi","Peu d'amis","Taquiné par les autres","Exclu du groupe ou n'est pas invité à participer aux activités","Joue les petits durs"]},lei:{label:"Temps libre / Hobby",items:["Incapable de se relaxer correctement pendant le temps libre","Obligé de pratiquer beaucoup de sport pour se relaxer","Blessures à la suite d'une pratique excessive du sport","Incapable de terminer un livre ou de regarder un film jusqu'au bout","Fatigué parce qu'affairé en permanence","Rapidement lassé par les hobbies","Recherche de sensations et/ou prise trop fréquente de risques","Problèmes avec la police/la justice","Nombre augmenté d'accidents"]},self:{label:"Confiance en soi / Image de soi",items:["Doute de lui-même suite aux remarques négatives des autres","Image de soi négative à cause des échecs du passé","Peur de l'échec avant de démarrer de nouvelles choses","Réaction excessive aux critiques","Perfectionnisme"]}};

const SK="diva2-queen";
const load=async()=>{try{const r=await window.storage.get(SK);return r?JSON.parse(r.value):null}catch{return null}};
const save=async s=>{try{await window.storage.set(SK,JSON.stringify(s))}catch{}};

/* Kawaii floating sparkles */
const Sparkles = () => {
  const sparkles = Array.from({length:8},(_,i)=>i);
  return <>{sparkles.map(i=><div key={i} style={{position:"absolute",fontSize:["✨","💫","⭐","🌸","💖","🦋","🌙","💕"][i],opacity:0.15+Math.random()*0.15,top:`${10+Math.random()*70}%`,left:`${5+Math.random()*90}%`,animation:`float${i%3} ${3+Math.random()*4}s ease-in-out infinite`,animationDelay:`${i*0.4}s`,pointerEvents:"none",zIndex:0}}>{["✨","💫","⭐","🌸","💖","🦋","🌙","💕"][i]}</div>)}<style>{`@keyframes float0{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(10deg)}}@keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.15)}}@keyframes float2{0%,100%{transform:translateX(0)}50%{transform:translateX(8px) translateY(-6px)}}`}</style></>;
};

const Chk=({label,checked,onChange})=>(
  <label style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 12px",borderRadius:10,cursor:"pointer",background:checked?"rgba(232,96,156,0.1)":"transparent",fontSize:14,lineHeight:1.5,userSelect:"none",transition:"all 0.2s"}}
    onMouseEnter={e=>{if(!checked)e.currentTarget.style.background="rgba(232,96,156,0.05)"}}
    onMouseLeave={e=>{e.currentTarget.style.background=checked?"rgba(232,96,156,0.1)":"transparent"}}>
    <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,minWidth:20,borderRadius:6,border:checked?`2px solid ${P.p}`:"2px solid #e0c0d0",background:checked?P.p:"#fff",marginTop:1,transition:"all 0.2s",transform:checked?"scale(1.1)":"scale(1)"}}>
      {checked&&<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </span>
    <span style={{color:P.tx}}>{label}</span>
    <input type="checkbox" checked={checked} onChange={onChange} style={{display:"none"}}/>
  </label>
);

const Tog=({value,onChange,label})=>(
  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
    <span style={{fontSize:13,color:P.tm,marginRight:4}}>{label}</span>
    <button onClick={()=>onChange(true)} style={{padding:"5px 18px",borderRadius:20,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:value===true?P.yes:P.bgd,color:value===true?"#fff":P.tm,boxShadow:value===true?"0 2px 8px rgba(34,197,94,0.3)":"none",transition:"all 0.2s",transform:value===true?"scale(1.05)":"scale(1)"}}>Oui ✓</button>
    <button onClick={()=>onChange(false)} style={{padding:"5px 18px",borderRadius:20,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:value===false?P.no:P.bgd,color:value===false?"#fff":P.tm,boxShadow:value===false?"0 2px 8px rgba(239,68,68,0.3)":"none",transition:"all 0.2s",transform:value===false?"scale(1.05)":"scale(1)"}}>Non ✗</button>
  </div>
);

const Card=({item,data,onTAd,onTCh,onSAd,onSCh})=>{
  const [open,setOpen]=useState(false);
  const bothYes=data.adultPresent===true&&data.childPresent===true;
  const oneYes=data.adultPresent===true||data.childPresent===true;
  const bothNo=data.adultPresent===false&&data.childPresent===false;
  const bg=bothYes?`linear-gradient(135deg,${P.yes},${P.yesD})`:oneYes?`linear-gradient(135deg,#f59e0b,#d97706)`:bothNo?`linear-gradient(135deg,${P.no},${P.noD})`:`linear-gradient(135deg,${P.ac},${P.bgd})`;
  return (
    <div style={{background:"#fff",borderRadius:16,boxShadow:"0 2px 8px rgba(232,96,156,0.08)",marginBottom:14,overflow:"hidden",border:`1px solid ${P.cb}`,transition:"transform 0.2s",":hover":{transform:"translateY(-1px)"}}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12,flex:1}}>
          <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:34,height:34,minWidth:34,borderRadius:10,background:bg,color:"#fff",fontWeight:700,fontSize:12,fontFamily:"monospace",transition:"all 0.3s",boxShadow:bothYes?"0 2px 8px rgba(34,197,94,0.3)":oneYes?"0 2px 8px rgba(245,158,11,0.3)":""}}>{item.id}</span>
          <span style={{fontSize:14,color:P.tx,lineHeight:1.45,fontWeight:500}}>{item.question}</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{transform:open?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",minWidth:20}}><path d="M5 7.5L10 12.5L15 7.5" stroke={P.tl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open&&<div style={{padding:"0 18px 18px"}}>
        {[["adult","Âge adulte",P.p],["child","Enfance (5–12 ans)",P.ch]].map(([age,lbl,col])=>(
          <div key={age} style={{marginBottom:age==="adult"?16:0,borderTop:age==="child"?`1px solid ${P.ac}`:"none",paddingTop:age==="child"?16:0}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:col,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:col}}/>{lbl}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              {item[age].map((ex,i)=><Chk key={i} label={ex} checked={data[age==="adult"?"adultChecked":"childChecked"][i]||false} onChange={()=>age==="adult"?onTAd(i):onTCh(i)}/>)}
            </div>
            <Tog value={age==="adult"?data.adultPresent:data.childPresent} onChange={age==="adult"?onSAd:onSCh} label="Symptôme présent :"/>
          </div>
        ))}
      </div>}
    </div>
  );
};

const ImpDom=({domain,checked,onToggle})=>(
  <div style={{marginBottom:16}}>
    <div style={{fontSize:13,fontWeight:700,color:P.tx,marginBottom:6,paddingBottom:4,borderBottom:`1px solid ${P.ac}`}}>{domain.label}</div>
    <div style={{display:"flex",flexDirection:"column",gap:2}}>{domain.items.map((it,i)=><Chk key={i} label={it} checked={checked[i]||false} onChange={()=>onToggle(i)}/>)}</div>
  </div>
);

const Bdg=({value,max,label})=>{
  const pct=max>0?value/max:0;const c=value>=6?P.yes:value>=4?"#f59e0b":P.no;
  return <div style={{textAlign:"center"}}><div style={{width:64,height:64,borderRadius:"50%",border:`4px solid ${c}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px",background:`conic-gradient(${c} ${pct*360}deg, ${P.bgd} 0deg)`,transition:"all 0.3s"}}><div style={{width:48,height:48,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:20,color:c,fontFamily:"monospace"}}>{value}</div></div><div style={{fontSize:11,color:P.tm,fontWeight:600}}>{label}</div><div style={{fontSize:10,color:P.tl}}>/ {max}</div></div>;
};

const mkDef=()=>({inat:INAT.map(it=>({adultChecked:Array(it.adult.length).fill(false),childChecked:Array(it.child.length).fill(false),adultPresent:null,childPresent:null})),hyp:HYPER.map(it=>({adultChecked:Array(it.adult.length).fill(false),childChecked:Array(it.child.length).fill(false),adultPresent:null,childPresent:null})),impAd:Object.fromEntries(Object.keys(IMP_AD).map(k=>[k,Array(IMP_AD[k].items.length).fill(false)])),impCh:Object.fromEntries(Object.keys(IMP_CH).map(k=>[k,Array(IMP_CH[k].items.length).fill(false)])),onset:null,onsetAge:"",crE:null,crEDet:""});

export default function App(){
  const [s,setS]=useState(mkDef());
  const [sec,setSec]=useState(0);
  const [sub,setSub]=useState(0);
  const [ld,setLd]=useState(true);
  const top=useRef(null);

  useEffect(()=>{(async()=>{const d=await load();if(d)setS(d);setLd(false)})()},[]);
  useEffect(()=>{if(!ld)save(s)},[s,ld]);
  useEffect(()=>{top.current?.scrollIntoView({behavior:"smooth"})},[sec,sub]);

  const upSym=(cat,i,f,v)=>setS(p=>{const n={...p};n[cat]=[...p[cat]];n[cat][i]={...p[cat][i],[f]:v};return n});
  const togEx=(cat,i,af,ei)=>setS(p=>{const n={...p};n[cat]=[...p[cat]];const a=[...p[cat][i][af]];a[ei]=!a[ei];n[cat][i]={...p[cat][i],[af]:a};return n});
  const togImp=(age,dom,i)=>setS(p=>{const k=age==="adult"?"impAd":"impCh";const n={...p};n[k]={...p[k]};const a=[...p[k][dom]];a[i]=!a[i];n[k][dom]=a;return n});

  const aA=s.inat.filter(x=>x.adultPresent===true).length;
  const aC=s.inat.filter(x=>x.childPresent===true).length;
  const hA=s.hyp.filter(x=>x.adultPresent===true).length;
  const hC=s.hyp.filter(x=>x.childPresent===true).length;
  const iA=Object.values(s.impAd).filter(a=>a.some(Boolean)).length;
  const iC=Object.values(s.impCh).filter(a=>a.some(Boolean)).length;
  const aCr=aA>=6&&aC>=6,hCr=hA>=6&&hC>=6,iM=iA>=2&&iC>=2;
  const oM=s.onset===true||(s.onset===false&&s.onsetAge!=="");
  const nE=s.crE===false;

  let dg=null;
  if(aCr&&hCr&&iM&&nE) dg={c:"314.01",l:"Type combiné"};
  else if(aCr&&!hCr&&iM&&nE) dg={c:"314.00",l:"Type inattentif prédominant"};
  else if(!aCr&&hCr&&iM&&nE) dg={c:"314.01",l:"Type hyperactif/impulsif prédominant"};

  const reset=async()=>{if(confirm("Réinitialiser toutes les réponses ?")){setS(mkDef());setSec(0);setSub(0);try{await window.storage.delete(SK)}catch{}}};

  if(ld) return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:P.bg,fontFamily:"system-ui"}}><div style={{textAlign:"center",color:P.tm}}><div style={{fontSize:40,marginBottom:12,animation:"pulse 1.5s ease-in-out infinite"}}>💖</div>Chargement...<style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}`}</style></div></div>;

  const its=sub===0?INAT:HYPER, cat=sub===0?"inat":"hyp";

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${P.bg},${P.bgd})`,fontFamily:"system-ui",paddingBottom:100}}>
      <div ref={top}/>
      <div style={{background:`linear-gradient(135deg,${P.p} 0%,${P.pl} 45%,${P.ac} 100%)`,padding:"36px 20px 28px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <Sparkles/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:14,opacity:0.9,marginBottom:6,letterSpacing:1}}>✨ DIVA 2.0 ✨</div>
          <div style={{fontSize:21,fontWeight:800,letterSpacing:-0.3,lineHeight:1.3,maxWidth:500,textShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>Est-ce que toi aussi tu es une TDAH Queen ? Découvre-le grâce au Diva 2 !</div>
          <div style={{fontSize:10,opacity:0.55,marginTop:10}}>Kooij & Francken, 2010 — DIVA Foundation</div>
          <div style={{display:"flex",gap:10,marginTop:18,flexWrap:"wrap"}}>
            {[{l:"A adulte",v:aA},{l:"A enfance",v:aC},{l:"H/I adulte",v:hA},{l:"H/I enfance",v:hC}].map(({l,v})=>
              <div key={l} style={{background:v>=6?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.15)",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6,backdropFilter:"blur(4px)",transition:"all 0.3s"}}>
                <span style={{fontFamily:"monospace",fontSize:16,fontWeight:800}}>{v}</span><span style={{opacity:0.7,fontSize:10}}>/9</span><span style={{opacity:0.85}}>{l}</span>
                {v>=6&&<span style={{fontSize:10}}>✅</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{display:"flex",background:"#fff",borderBottom:`1px solid ${P.cb}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
        {["Symptômes","Retentissement","Résultats"].map((l,i)=><button key={i} onClick={()=>{setSec(i);if(i===0)setSub(0)}} style={{flex:1,padding:"14px 8px",background:"none",border:"none",borderBottom:sec===i?`3px solid ${P.p}`:"3px solid transparent",color:sec===i?P.p:P.tl,fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.2s"}}>{l}</button>)}
      </div>

      <div style={{maxWidth:640,margin:"0 auto",padding:"16px 12px"}}>
        {sec===0&&<>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {["🧠 Inattention (A1–A9)","⚡ Hyperactivité-Impulsivité (H/I 1–9)"].map((l,i)=>
              <button key={i} onClick={()=>setSub(i)} style={{flex:1,padding:"10px 8px",borderRadius:12,border:"none",fontSize:12,fontWeight:700,cursor:"pointer",background:sub===i?(i===0?P.p:P.ch):P.bgd,color:sub===i?"#fff":P.tm,boxShadow:sub===i?"0 3px 12px rgba(232,96,156,0.25)":"none",transition:"all 0.2s",transform:sub===i?"scale(1.02)":"scale(1)"}}>{l}</button>
            )}
          </div>
          <div style={{fontSize:12,color:P.tm,marginBottom:14,padding:"10px 14px",background:P.bg,borderRadius:12,lineHeight:1.5,border:`1px solid ${P.ac}`}}>
            🌸 Appuyez sur chaque critère pour l'ouvrir. Cochez les exemples reconnus, puis indiquez si le symptôme est présent (<strong style={{color:P.yes}}>Oui</strong> / <strong style={{color:P.no}}>Non</strong>) pour l'âge adulte et l'enfance.
          </div>
          {its.map((item,idx)=><Card key={item.id} item={item} data={s[cat][idx]} onTAd={ei=>togEx(cat,idx,"adultChecked",ei)} onTCh={ei=>togEx(cat,idx,"childChecked",ei)} onSAd={v=>upSym(cat,idx,"adultPresent",v)} onSCh={v=>upSym(cat,idx,"childPresent",v)}/>)}
        </>}

        {sec===1&&<>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.tx,marginBottom:12}}>🕐 Critère B — Âge de début</div>
            <div style={{fontSize:13,color:P.tx,marginBottom:12,lineHeight:1.5}}>Avez-vous toujours eu ces symptômes ? Quelques symptômes étaient-ils présents avant l'âge de 7 ans ?</div>
            <Tog value={s.onset} onChange={v=>setS(p=>({...p,onset:v}))} label="Avant 7 ans :"/>
            {s.onset===false&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:P.tm}}>Âge de début :</span><input type="number" min="0" max="99" value={s.onsetAge} onChange={e=>setS(p=>({...p,onsetAge:e.target.value}))} style={{width:60,padding:"6px 10px",borderRadius:10,border:`1px solid ${P.cb}`,fontSize:14,fontWeight:600,textAlign:"center",color:P.tx,background:P.bg}}/><span style={{fontSize:13,color:P.tm}}>ans</span></div>}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.p,marginBottom:4}}>👩‍💼 Critère C — Retentissement à l'âge adulte</div>
            <div style={{fontSize:11,color:iA>=2?P.yes:P.tl,fontWeight:600,marginBottom:14}}>{iA}/5 domaines atteints (≥ 2 requis) {iA>=2?"✅":""}</div>
            {Object.entries(IMP_AD).map(([k,d])=><ImpDom key={k} domain={d} checked={s.impAd[k]} onToggle={i=>togImp("adult",k,i)}/>)}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.ch,marginBottom:4}}>👧 Critère C — Retentissement dans l'enfance</div>
            <div style={{fontSize:11,color:iC>=2?P.yes:P.tl,fontWeight:600,marginBottom:14}}>{iC}/5 domaines atteints (≥ 2 requis) {iC>=2?"✅":""}</div>
            {Object.entries(IMP_CH).map(([k,d])=><ImpDom key={k} domain={d} checked={s.impCh[k]} onToggle={i=>togImp("child",k,i)}/>)}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:18,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
            <div style={{fontSize:14,fontWeight:700,color:P.tx,marginBottom:12}}>🔍 Critère E — Diagnostic différentiel</div>
            <div style={{fontSize:13,color:P.tx,marginBottom:12,lineHeight:1.5}}>Les symptômes peuvent-ils être mieux expliqués par la présence d'un autre trouble psychiatrique ?</div>
            <Tog value={s.crE} onChange={v=>setS(p=>({...p,crE:v}))} label="Mieux expliqué :"/>
            {s.crE===true&&<input type="text" placeholder="Précisez le trouble..." value={s.crEDet} onChange={e=>setS(p=>({...p,crEDet:e.target.value}))} style={{marginTop:12,width:"100%",padding:"10px 14px",borderRadius:12,border:`1px solid ${P.cb}`,fontSize:13,boxSizing:"border-box",color:P.tx,background:P.bg}}/>}
          </div>
        </>}

        {sec===2&&<>
          <div style={{background:"#fff",borderRadius:16,padding:24,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
            <div style={{fontSize:16,fontWeight:800,color:P.tx,marginBottom:20,textAlign:"center"}}>✨ Résumé des symptômes ✨</div>
            <div style={{display:"flex",justifyContent:"space-around",marginBottom:24}}>
              <Bdg value={aA} max={9} label="A adulte"/><Bdg value={aC} max={9} label="A enfance"/><Bdg value={hA} max={9} label="H/I adulte"/><Bdg value={hC} max={9} label="H/I enfance"/>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{borderBottom:`2px solid ${P.ac}`}}><th style={{textAlign:"left",padding:"8px 6px",color:P.tm}}>Critère</th><th style={{textAlign:"center",padding:"8px 6px",color:P.p}}>Adulte</th><th style={{textAlign:"center",padding:"8px 6px",color:P.ch}}>Enfance</th></tr></thead>
                <tbody>
                  {INAT.map((it,i)=><tr key={it.id} style={{borderBottom:`1px solid ${P.bgd}`}}><td style={{padding:"7px 6px",fontWeight:600,color:P.tx}}>{it.id}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.inat[i].adultPresent===true?"✅":s.inat[i].adultPresent===false?"—":"·"}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.inat[i].childPresent===true?"✅":s.inat[i].childPresent===false?"—":"·"}</td></tr>)}
                  <tr style={{borderBottom:`2px solid ${P.ac}`,background:P.bg}}><td style={{padding:"8px 6px",fontWeight:700,color:P.tx}}>Total A</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:aA>=6?P.yes:P.no}}>{aA}/9</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:aC>=6?P.yes:P.no}}>{aC}/9</td></tr>
                  {HYPER.map((it,i)=><tr key={it.id} style={{borderBottom:`1px solid ${P.bgd}`}}><td style={{padding:"7px 6px",fontWeight:600,color:P.tx}}>{it.id}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.hyp[i].adultPresent===true?"✅":s.hyp[i].adultPresent===false?"—":"·"}</td><td style={{textAlign:"center",padding:"7px 6px"}}>{s.hyp[i].childPresent===true?"✅":s.hyp[i].childPresent===false?"—":"·"}</td></tr>)}
                  <tr style={{background:P.bg}}><td style={{padding:"8px 6px",fontWeight:700,color:P.tx}}>Total H/I</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:hA>=6?P.yes:P.no}}>{hA}/9</td><td style={{textAlign:"center",padding:"8px 6px",fontWeight:800,color:hC>=6?P.yes:P.no}}>{hC}/9</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{background:"#fff",borderRadius:16,padding:20,marginBottom:16,border:`1px solid ${P.cb}`,boxShadow:"0 2px 8px rgba(232,96,156,0.08)"}}>
            <div style={{fontSize:16,fontWeight:800,color:P.tx,marginBottom:16,textAlign:"center"}}>📋 Formulaire de cotation</div>
            {[{l:"Critère A : ≥ 6 Inattention (adulte)",m:aA>=6},{l:"Critère A : ≥ 6 Inattention (enfance)",m:aC>=6},{l:"Critère A : ≥ 6 H/I (adulte)",m:hA>=6},{l:"Critère A : ≥ 6 H/I (enfance)",m:hC>=6},{l:"Critère B : Début avant 7 ans ou âge précisé",m:oM},{l:"Critère C : ≥ 2 domaines (adulte)",m:iA>=2},{l:"Critère C : ≥ 2 domaines (enfance)",m:iC>=2},{l:"Critère E : Non mieux expliqué",m:nE}].map(({l,m},i)=>
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<7?`1px solid ${P.bgd}`:"none"}}>
                <span style={{width:24,height:24,minWidth:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:m?P.yes:P.bgd,color:"#fff",fontSize:13,boxShadow:m?"0 2px 6px rgba(34,197,94,0.3)":"none",transition:"all 0.3s"}}>{m?"✓":""}</span>
                <span style={{fontSize:13,color:m?P.tx:P.tl,fontWeight:m?600:400}}>{l}</span>
              </div>
            )}
          </div>

          <div style={{background:dg?`linear-gradient(135deg,${P.p},${P.pd},${P.p})`:"#fff",borderRadius:16,padding:24,marginBottom:16,border:dg?"none":`1px solid ${P.cb}`,boxShadow:dg?"0 4px 20px rgba(232,96,156,0.3)":"0 2px 8px rgba(232,96,156,0.08)",textAlign:"center",position:"relative",overflow:"hidden"}}>
            {dg&&<Sparkles/>}
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:dg?"rgba(255,255,255,0.6)":P.tl,marginBottom:12}}>{dg?"👑 ":""}Diagnostic TDAH{dg?" 👑":""}</div>
              {dg?<><div style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:8}}>{dg.l}</div><div style={{fontSize:14,color:"rgba(255,255,255,0.7)",fontFamily:"monospace"}}>DSM-IV {dg.c}</div></>
              :<><div style={{fontSize:16,fontWeight:700,color:P.tx,marginBottom:8}}>{(aCr||hCr)&&!iM?"Critères symptomatiques atteints — compléter le retentissement":s.crE===true?"Symptômes mieux expliqués par un autre trouble":"Critères diagnostiques non remplis"}</div>
                <div style={{fontSize:12,color:P.tm,lineHeight:1.5}}>{!aCr&&!hCr?"Le seuil de 6 symptômes n'est pas atteint.":!iM?"Complétez la section Retentissement.":s.crE===null?"Complétez le critère E.":""}</div></>}
            </div>
          </div>

          <div style={{padding:"14px 16px",background:P.bg,borderRadius:12,fontSize:11,color:P.tm,lineHeight:1.5,marginBottom:16,border:`1px solid ${P.ac}`}}>
            💡 Cet outil est une aide à la passation de la DIVA 2.0 et ne remplace pas le jugement clinique d'un professionnel de santé qualifié. Le diagnostic de TDAH doit être posé par un clinicien formé.
          </div>
          <button onClick={reset} style={{width:"100%",padding:"14px",borderRadius:14,border:`1px solid ${P.ac}`,background:"#fff",color:P.pd,fontWeight:700,fontSize:14,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=P.bgd} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>🗑️ Réinitialiser tout</button>
        </>}
      </div>
    </div>
  );
}
