import re,html
exec(open('gen.py').read().split("out=[]")[0])  # G,Y,O,lanes,W
src=open('gen.py').read()
ns={}
exec(src.replace("open('new.svg','w')","(lambda *a,**k:__import__('io').StringIO())('x')"),ns)
cards=ns['cards'];conns=ns['conns'];LY=ns['LY'];heads=ns['heads']
B={}
for (id_,l,x,t,c) in cards: B[id_]=(x,LY[l]+50,300,160)
def pt(id_,side):
    x,y,w,h=B[id_]
    return {'top':(x+w/2,y),'bottom':(x+w/2,y+h),'left':(x,y+h/2),'right':(x+w,y+h/2)}[side]
H=1760
o=[f'<html><head><meta charset="utf-8"><style>body{{margin:0;font-family:"Noto Sans",Arial,sans-serif}}#f{{position:relative;width:{W}px;height:{H}px;background:#fff}}.b{{position:absolute;border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;padding:10px 16px;color:#1a1a1a;line-height:1.3}}.t{{position:absolute;font-weight:700;color:#1a1a1a}}</style></head><body><div id="f">']
o.append('<div class="t" style="left:32px;top:30px;font-size:56px">Facturer une enquête Plein Sens Ethique dans Alphonse : le parcours cible</div>')
o.append('<div class="t" style="left:34px;top:112px;font-size:24px;font-weight:400;color:#555">Tableau Miro « Facturation PSE · parcours et chantiers », mis à jour le 10 novembre 2026</div>')
for i,(t,c,tc) in enumerate([('Existe déjà',G,'#067429'),('À adapter',Y,'#af7e04'),('À créer',O,'#9b4a08')]):
    o.append(f'<div class="b" style="left:{2700+i*290}px;top:44px;width:260px;height:64px;background:{c};color:{tc};font-weight:700;font-size:22px">{t}</div>')
for x,t in heads: o.append(f'<div class="t" style="left:{x}px;top:168px;font-size:30px">{t}</div>')
for (id_,t,y,bg) in lanes:
    o.append(f'<div class="b" style="left:32px;top:{y}px;width:220px;height:260px;background:#dedaff;color:#6631d7;font-weight:700;font-size:21px">{t}</div>')
    o.append(f'<div style="position:absolute;left:264px;top:{y}px;width:{W-296}px;height:260px;background:{bg}"></div>')
for (id_,l,x,t,c) in cards:
    fs=18 if len(t)>70 else 20
    o.append(f'<div class="b" style="left:{x}px;top:{LY[l]+50}px;width:300px;height:160px;background:{c};font-size:{fs+2}px">{html.escape(t)}</div>')
sv=[f'<svg style="position:absolute;left:0;top:0" width="{W}" height="{H}"><defs><marker id="ar" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,1 L11,6 L0,11 z" fill="#313131"/></marker></defs>']
for (s,e,ss,es,lab,da) in conns:
    P=pt(s,ss);Q=pt(e,es)
    hz=lambda sd: sd in('left','right')
    if hz(ss) and hz(es): mx=(P[0]+Q[0])/2; pts=[P,(mx,P[1]),(mx,Q[1]),Q]; L=(mx,(P[1]+Q[1])/2)
    elif not hz(ss) and not hz(es): my=(P[1]+Q[1])/2; pts=[P,(P[0],my),(Q[0],my),Q]; L=((P[0]+Q[0])/2,my)
    elif hz(ss): pts=[P,(Q[0],P[1]),Q]; L=((P[0]+Q[0])/2,P[1])
    else: pts=[P,(P[0],Q[1]),Q]; L=(P[0],(P[1]+Q[1])/2)
    d='M'+' L'.join(f'{a:.0f},{b:.0f}' for a,b in pts)
    sv.append(f'<path d="{d}" fill="none" stroke="#313131" stroke-width="2.5" marker-end="url(#ar)"{" stroke-dasharray=\"8,7\"" if da else ""}/>')
    if lab: sv.append(f'<rect x="{L[0]-len(lab)*6-8}" y="{L[1]-14}" width="{len(lab)*12+16}" height="28" rx="6" fill="#fff"/><text x="{L[0]}" y="{L[1]+7}" text-anchor="middle" font-size="19" fill="#333" font-family="Noto Sans,Arial">{html.escape(lab)}</text>')
sv.append('</svg>')
o+=sv
o.append('<div style="position:absolute;left:34px;top:1640px;width:3500px;font-size:24px;color:#333;line-height:1.4"><b>À retenir.</b> Toute l\'équipe voit la facturation de tous les chantiers, en lecture ; seuls le chef de projet, l\'associé de référence et le rôle Finance agissent. Chaque facture est relue deux fois : par le chef de projet, puis par la finance avant l\'émission. Alphonse n\'envoie pas les factures : la finance les envoie ou les dépose comme aujourd\'hui, puis note le statut. Un « oui » simple se donne depuis le mail, confirmé sur une page dédiée ; reporter ou ajouter un complément se fait dans Alphonse. Le référent facturation de chaque enquête est une personne du rôle Finance, qui peut changer d\'une enquête à l\'autre.</div>')
o.append('</div></body></html>')
open('render.html','w').write(''.join(o))
