const RHYME_DICTIONARY = [
  // F_IGHT
  ['night','F_IGHT'],['light','F_IGHT'],['right','F_IGHT'],['fight','F_IGHT'],
  ['sight','F_IGHT'],['might','F_IGHT'],['bright','F_IGHT'],['flight','F_IGHT'],
  ['tight','F_IGHT'],['white','F_IGHT'],['bite','F_IGHT'],['quite','F_IGHT'],
  ['tonight','F_IGHT'],['midnight','F_IGHT'],['sunlight','F_IGHT'],['moonlight','F_IGHT'],
  ['fright','F_IGHT'],['slight','F_IGHT'],['blight','F_IGHT'],['plight','F_IGHT'],
  ['ignite','F_IGHT'],['delight','F_IGHT'],['despite','F_IGHT'],['excite','F_IGHT'],
  ['invite','F_IGHT'],['polite','F_IGHT'],['recite','F_IGHT'],['unite','F_IGHT'],
  ['daylight','F_IGHT'],['highlight','F_IGHT'],['insight','F_IGHT'],['upright','F_IGHT'],
  ['outright','F_IGHT'],['foresight','F_IGHT'],['hindsight','F_IGHT'],['oversight','F_IGHT'],

  // F_IPE / F_YPE
  ['pipe','F_IPE'],['ripe','F_IPE'],['swipe','F_IPE'],['stripe','F_IPE'],
  ['gripe','F_IPE'],['wipe','F_IPE'],['type','F_YPE'],['hype','F_YPE'],
  ['snipe','F_IPE'],['tripe','F_IPE'],['archetype','F_YPE'],['stereotype','F_YPE'],
  ['prototype','F_YPE'],['overripe','F_IPE'],

  // F_EEN (covers green, seen, clean, mean, lean, keen, dream, team, seem, stream)
  ['green','F_EEN'],['seen','F_EEN'],['clean','F_EEN'],['mean','F_EEN'],
  ['lean','F_EEN'],['keen','F_EEN'],['between','F_EEN'],['queen','F_EEN'],
  ['screen','F_EEN'],['scene','F_EEN'],['machine','F_EEN'],['routine','F_EEN'],
  ['dream','F_EEN'],['team','F_EEN'],['seem','F_EEN'],['stream','F_EEN'],
  ['scheme','F_EEN'],['theme','F_EEN'],['cream','F_EEN'],['beam','F_EEN'],
  ['steam','F_EEN'],['seam','F_EEN'],['gleam','F_EEN'],['extreme','F_EEN'],
  ['supreme','F_EEN'],['esteem','F_EEN'],['redeem','F_EEN'],['mainstream','F_EEN'],
  ['downstream','F_EEN'],['upstream','F_EEN'],['magazine','F_EEN'],['submarine','F_EEN'],
  ['trampoline','F_EEN'],['gasoline','F_EEN'],['serpentine','F_EEN'],['quarantine','F_EEN'],
  ['halloween','F_EEN'],['evergreen','F_EEN'],['unforeseen','F_EEN'],['seventeen','F_EEN'],
  ['eighteen','F_EEN'],['thirteen','F_EEN'],['fourteen','F_EEN'],['fifteen','F_EEN'],
  ['sixteen','F_EEN'],['nineteen','F_EEN'],

  // F_EEL
  ['feel','F_EEL'],['real','F_EEL'],['deal','F_EEL'],['heal','F_EEL'],
  ['steal','F_EEL'],['reveal','F_EEL'],['appeal','F_EEL'],['kneel','F_EEL'],
  ['wheel','F_EEL'],['seal','F_EEL'],['meal','F_EEL'],['zeal','F_EEL'],
  ['ideal','F_EEL'],['conceal','F_EEL'],['unreal','F_EEL'],['surreal','F_EEL'],
  ['ordeal','F_EEL'],['repeal','F_EEL'],['congeal','F_EEL'],

  // F_EED
  ['need','F_EED'],['speed','F_EED'],['freed','F_EED'],['bleed','F_EED'],
  ['seed','F_EED'],['feed','F_EED'],['greed','F_EED'],['creed','F_EED'],
  ['lead','F_EED'],['read','F_EED'],['breed','F_EED'],['proceed','F_EED'],
  ['succeed','F_EED'],['indeed','F_EED'],['exceed','F_EED'],['concede','F_EED'],
  ['stampede','F_EED'],['disagreed','F_EED'],

  // F_EEP
  ['deep','F_EEP'],['sleep','F_EEP'],['keep','F_EEP'],['leap','F_EEP'],
  ['sweep','F_EEP'],['weep','F_EEP'],['creep','F_EEP'],['steep','F_EEP'],
  ['heap','F_EEP'],['reap','F_EEP'],['cheap','F_EEP'],['asleep','F_EEP'],

  // F_EEK
  ['speak','F_EEK'],['week','F_EEK'],['seek','F_EEK'],['peak','F_EEK'],
  ['freak','F_EEK'],['unique','F_EEK'],['technique','F_EEK'],['antique','F_EEK'],
  ['streak','F_EEK'],['tweak','F_EEK'],['bleak','F_EEK'],['geek','F_EEK'],
  ['cheek','F_EEK'],['sleek','F_EEK'],['meek','F_EEK'],['peek','F_EEK'],

  // F_ELL
  ['tell','F_ELL'],['well','F_ELL'],['fell','F_ELL'],['sell','F_ELL'],
  ['bell','F_ELL'],['spell','F_ELL'],['shell','F_ELL'],['smell','F_ELL'],
  ['yell','F_ELL'],['dwell','F_ELL'],['hotel','F_ELL'],['excel','F_ELL'],
  ['rebel','F_ELL'],['farewell','F_ELL'],['doorbell','F_ELL'],['nutshell','F_ELL'],
  ['stairwell','F_ELL'],

  // F_END
  ['bend','F_END'],['friend','F_END'],['end','F_END'],['send','F_END'],
  ['blend','F_END'],['spend','F_END'],['mend','F_END'],['trend','F_END'],
  ['defend','F_END'],['extend','F_END'],['pretend','F_END'],['depend','F_END'],
  ['offend','F_END'],['intend','F_END'],['ascend','F_END'],['descend','F_END'],
  ['recommend','F_END'],['transcend','F_END'],['comprehend','F_END'],

  // F_ENT
  ['went','F_ENT'],['sent','F_ENT'],['bent','F_ENT'],['rent','F_ENT'],
  ['spent','F_ENT'],['meant','F_ENT'],['dent','F_ENT'],['event','F_ENT'],
  ['cement','F_ENT'],['content','F_ENT'],['intent','F_ENT'],['relent','F_ENT'],
  ['prevent','F_ENT'],['invent','F_ENT'],['consent','F_ENT'],['dissent','F_ENT'],
  ['percent','F_ENT'],['accent','F_ENT'],['descent','F_ENT'],['extent','F_ENT'],
  ['represent','F_ENT'],['supplement','F_ENT'],['complement','F_ENT'],

  // F_ESS
  ['less','F_ESS'],['stress','F_ESS'],['bless','F_ESS'],['dress','F_ESS'],
  ['press','F_ESS'],['guess','F_ESS'],['mess','F_ESS'],['confess','F_ESS'],
  ['express','F_ESS'],['address','F_ESS'],['success','F_ESS'],['progress','F_ESS'],
  ['excess','F_ESS'],['possess','F_ESS'],['obsess','F_ESS'],['assess','F_ESS'],
  ['impress','F_ESS'],['repress','F_ESS'],['suppress','F_ESS'],['compress','F_ESS'],
  ['distress','F_ESS'],['nevertheless','F_ESS'],

  // F_EST
  ['best','F_EST'],['rest','F_EST'],['test','F_EST'],['chest','F_EST'],
  ['quest','F_EST'],['nest','F_EST'],['west','F_EST'],['invest','F_EST'],
  ['protest','F_EST'],['suggest','F_EST'],['request','F_EST'],['contest','F_EST'],
  ['arrest','F_EST'],['interest','F_EST'],['manifest','F_EST'],['harvest','F_EST'],

  // F_AME
  ['flame','F_AME'],['game','F_AME'],['name','F_AME'],['same','F_AME'],
  ['claim','F_AME'],['frame','F_AME'],['blame','F_AME'],['came','F_AME'],
  ['tame','F_AME'],['fame','F_AME'],['shame','F_AME'],['aim','F_AME'],
  ['became','F_AME'],['proclaim','F_AME'],['reclaim','F_AME'],['exclaim','F_AME'],
  ['nickname','F_AME'],['overcame','F_AME'],['acclaim','F_AME'],

  // F_AIN / F_ANE
  ['pain','F_AIN'],['rain','F_AIN'],['chain','F_AIN'],['brain','F_AIN'],
  ['remain','F_AIN'],['explain','F_AIN'],['gain','F_AIN'],['train','F_AIN'],
  ['plain','F_AIN'],['again','F_AIN'],['maintain','F_AIN'],['contain','F_AIN'],
  ['obtain','F_AIN'],['attain','F_AIN'],['campaign','F_AIN'],['complain','F_AIN'],
  ['refrain','F_AIN'],['sustain','F_AIN'],['domain','F_AIN'],['terrain','F_AIN'],
  ['lane','F_ANE'],['sane','F_ANE'],['insane','F_ANE'],['mundane','F_ANE'],
  ['hurricane','F_ANE'],['cocaine','F_ANE'],['membrane','F_ANE'],['propane','F_ANE'],

  // F_AY
  ['day','F_AY'],['way','F_AY'],['say','F_AY'],['play','F_AY'],['stay','F_AY'],
  ['away','F_AY'],['today','F_AY'],['okay','F_AY'],['display','F_AY'],['delay','F_AY'],
  ['pray','F_AY'],['sway','F_AY'],['gray','F_AY'],['spray','F_AY'],['stray','F_AY'],
  ['betray','F_AY'],['relay','F_AY'],['repay','F_AY'],['decay','F_AY'],
  ['runway','F_AY'],['subway','F_AY'],['highway','F_AY'],['birthday','F_AY'],
  ['yesterday','F_AY'],['someday','F_AY'],['anyway','F_AY'],['halfway','F_AY'],
  ['gateway','F_AY'],['stairway','F_AY'],['pathway','F_AY'],['freeway','F_AY'],
  ['getaway','F_AY'],['throwaway','F_AY'],['giveaway','F_AY'],['castaway','F_AY'],
  ['holiday','F_AY'],['overlay','F_AY'],['underway','F_AY'],['doomsday','F_AY'],

  // F_AZE
  ['blaze','F_AZE'],['phase','F_AZE'],['gaze','F_AZE'],['maze','F_AZE'],
  ['daze','F_AZE'],['craze','F_AZE'],['haze','F_AZE'],['glaze','F_AZE'],
  ['graze','F_AZE'],['amaze','F_AZE'],['ablaze','F_AZE'],['phrase','F_AZE'],
  ['praise','F_AZE'],['raise','F_AZE'],['days','F_AZE'],['ways','F_AZE'],

  // F_ACE
  ['space','F_ACE'],['place','F_ACE'],['face','F_ACE'],['race','F_ACE'],
  ['grace','F_ACE'],['chase','F_ACE'],['base','F_ACE'],['case','F_ACE'],
  ['trace','F_ACE'],['embrace','F_ACE'],['bass','F_ACE'],['erase','F_ACE'],
  ['replace','F_ACE'],['misplace','F_ACE'],['birthplace','F_ACE'],['workplace','F_ACE'],
  ['commonplace','F_ACE'],['interface','F_ACE'],['marketplace','F_ACE'],

  // F_INE
  ['mine','F_INE'],['line','F_INE'],['fine','F_INE'],['shine','F_INE'],
  ['wine','F_INE'],['divine','F_INE'],['design','F_INE'],['spine','F_INE'],
  ['combine','F_INE'],['define','F_INE'],['confine','F_INE'],['decline','F_INE'],
  ['online','F_INE'],['offline','F_INE'],['sunshine','F_INE'],['deadline','F_INE'],
  ['lifetime','F_INE'],['airline','F_INE'],['headline','F_INE'],['pipeline','F_INE'],
  ['sideline','F_INE'],['outline','F_INE'],['baseline','F_INE'],['guideline','F_INE'],
  ['borderline','F_INE'],['intertwine','F_INE'],['undermine','F_INE'],['valentine','F_INE'],

  // F_IME
  ['time','F_IME'],['climb','F_IME'],['crime','F_IME'],['rhyme','F_IME'],
  ['sublime','F_IME'],['prime','F_IME'],['dime','F_IME'],['lime','F_IME'],
  ['mime','F_IME'],['slime','F_IME'],['chime','F_IME'],['grime','F_IME'],
  ['overtime','F_IME'],['bedtime','F_IME'],['lifetime','F_IME'],['pastime','F_IME'],
  ['sometime','F_IME'],['daytime','F_IME'],['nighttime','F_IME'],['halftime','F_IME'],

  // F_IRE
  ['fire','F_IRE'],['higher','F_IRE'],['desire','F_IRE'],['inspire','F_IRE'],
  ['wire','F_IRE'],['tired','F_IRE'],['hired','F_IRE'],['liar','F_IRE'],
  ['prior','F_IRE'],['entire','F_IRE'],['require','F_IRE'],['admire','F_IRE'],
  ['empire','F_IRE'],['expire','F_IRE'],['retire','F_IRE'],['acquire','F_IRE'],
  ['aspire','F_IRE'],['conspire','F_IRE'],['enquire','F_IRE'],['misfire','F_IRE'],
  ['backfire','F_IRE'],['crossfire','F_IRE'],['gunfire','F_IRE'],['campfire','F_IRE'],

  // F_ILL
  ['ill','F_ILL'],['will','F_ILL'],['still','F_ILL'],['fill','F_ILL'],
  ['kill','F_ILL'],['hill','F_ILL'],['bill','F_ILL'],['chill','F_ILL'],
  ['drill','F_ILL'],['skill','F_ILL'],['spill','F_ILL'],['thrill','F_ILL'],
  ['until','F_ILL'],['fulfill','F_ILL'],['distill','F_ILL'],['overkill','F_ILL'],
  ['downhill','F_ILL'],['uphill','F_ILL'],['treadmill','F_ILL'],['windmill','F_ILL'],
  ['grill','F_ILL'],['frill','F_ILL'],['pill','F_ILL'],['mill','F_ILL'],['nil','F_ILL'],['sill','F_ILL'],['till','F_ILL'],

  // F_ING
  ['ring','F_ING'],['sing','F_ING'],['bring','F_ING'],['thing','F_ING'],
  ['spring','F_ING'],['string','F_ING'],['swing','F_ING'],['king','F_ING'],
  ['wing','F_ING'],['sting','F_ING'],['fling','F_ING'],['cling','F_ING'],
  ['sling','F_ING'],['everything','F_ING'],['anything','F_ING'],['something','F_ING'],
  ['nothing','F_ING'],['offering','F_ING'],['suffering','F_ING'],['wandering','F_ING'],

  // F_INK
  ['think','F_INK'],['drink','F_INK'],['sink','F_INK'],['link','F_INK'],
  ['blink','F_INK'],['rink','F_INK'],['brink','F_INK'],['shrink','F_INK'],
  ['stink','F_INK'],['wink','F_INK'],['pink','F_INK'],['ink','F_INK'],
  ['rethink','F_INK'],['interlink','F_INK'],['overthink','F_INK'],

  // F_IP
  ['trip','F_IP'],['drip','F_IP'],['grip','F_IP'],['ship','F_IP'],
  ['tip','F_IP'],['skip','F_IP'],['flip','F_IP'],['chip','F_IP'],
  ['dip','F_IP'],['hip','F_IP'],['rip','F_IP'],['slip','F_IP'],
  ['strip','F_IP'],['equip','F_IP'],['hardship','F_IP'],['friendship','F_IP'],
  ['championship','F_IP'],['relationship','F_IP'],['partnership','F_IP'],

  // F_IT
  ['bit','F_IT'],['hit','F_IT'],['sit','F_IT'],['fit','F_IT'],
  ['spit','F_IT'],['split','F_IT'],['commit','F_IT'],['permit','F_IT'],
  ['submit','F_IT'],['admit','F_IT'],['legit','F_IT'],['outfit','F_IT'],
  ['benefit','F_IT'],['counterfeit','F_IT'],['unfit','F_IT'],['misfit','F_IT'],

  // F_ONE
  ['alone','F_ONE'],['phone','F_ONE'],['zone','F_ONE'],['known','F_ONE'],
  ['throne','F_ONE'],['stone','F_ONE'],['own','F_ONE'],['shown','F_ONE'],
  ['tone','F_ONE'],['blown','F_ONE'],['bone','F_ONE'],['cone','F_ONE'],
  ['grown','F_ONE'],['drone','F_ONE'],['prone','F_ONE'],['clone','F_ONE'],
  ['postpone','F_ONE'],['microphone','F_ONE'],['headphone','F_ONE'],['saxophone','F_ONE'],
  ['cornerstone','F_ONE'],['milestone','F_ONE'],['limestone','F_ONE'],['tombstone','F_ONE'],
  ['overthrown','F_ONE'],['overgrown','F_ONE'],['outgrown','F_ONE'],['unknown','F_ONE'],

  // F_ONG
  ['song','F_ONG'],['long','F_ONG'],['strong','F_ONG'],['along','F_ONG'],
  ['belong','F_ONG'],['wrong','F_ONG'],['prolong','F_ONG'],['lifelong','F_ONG'],
  ['headstrong','F_ONG'],['singsong','F_ONG'],

  // F_OLD
  ['cold','F_OLD'],['bold','F_OLD'],['told','F_OLD'],['gold','F_OLD'],
  ['hold','F_OLD'],['fold','F_OLD'],['sold','F_OLD'],['old','F_OLD'],
  ['soul','F_OLD'],['roll','F_OLD'],['whole','F_OLD'],['goal','F_OLD'],
  ['control','F_OLD'],['patrol','F_OLD'],['console','F_OLD'],['enroll','F_OLD'],
  ['scroll','F_OLD'],['stroll','F_OLD'],['behold','F_OLD'],['withhold','F_OLD'],
  ['household','F_OLD'],['threshold','F_OLD'],['blindfold','F_OLD'],['unfold','F_OLD'],

  // F_OW
  ['know','F_OW'],['show','F_OW'],['throw','F_OW'],['flow','F_OW'],
  ['glow','F_OW'],['slow','F_OW'],['grow','F_OW'],['blow','F_OW'],
  ['below','F_OW'],['bestow','F_OW'],['although','F_OW'],['rainbow','F_OW'],
  ['overflow','F_OW'],['plateau','F_OW'],['shadow','F_OW'],['hollow','F_OW'],
  ['follow','F_OW'],['tomorrow','F_OW'],['window','F_OW'],['elbow','F_OW'],

  // F_OUND
  ['sound','F_OUND'],['found','F_OUND'],['ground','F_OUND'],['around','F_OUND'],
  ['bound','F_OUND'],['round','F_OUND'],['pound','F_OUND'],['wound','F_OUND'],
  ['mound','F_OUND'],['profound','F_OUND'],['surround','F_OUND'],['compound','F_OUND'],
  ['background','F_OUND'],['underground','F_OUND'],['playground','F_OUND'],['battleground','F_OUND'],

  // F_OWN
  ['crown','F_OWN'],['down','F_OWN'],['town','F_OWN'],['brown','F_OWN'],
  ['clown','F_OWN'],['frown','F_OWN'],['gown','F_OWN'],['drown','F_OWN'],
  ['downtown','F_OWN'],['breakdown','F_OWN'],['countdown','F_OWN'],['lockdown','F_OWN'],
  ['meltdown','F_OWN'],['showdown','F_OWN'],['sundown','F_OWN'],['touchdown','F_OWN'],
  ['letdown','F_OWN'],['handdown','F_OWN'],['rundown','F_OWN'],['renown','F_OWN'],

  // F_OUT
  ['out','F_OUT'],['shout','F_OUT'],['doubt','F_OUT'],['about','F_OUT'],
  ['throughout','F_OUT'],['without','F_OUT'],['devout','F_OUT'],['scout','F_OUT'],
  ['clout','F_OUT'],['sprout','F_OUT'],['snout','F_OUT'],['pout','F_OUT'],
  ['workout','F_OUT'],['dropout','F_OUT'],['burnout','F_OUT'],['fallout','F_OUT'],
  ['blackout','F_OUT'],['breakout','F_OUT'],['standout','F_OUT'],['cutout','F_OUT'],

  // F_OO
  ['too','F_OO'],['you','F_OO'],['true','F_OO'],['blue','F_OO'],['new','F_OO'],
  ['few','F_OO'],['knew','F_OO'],['grew','F_OO'],['drew','F_OO'],['threw','F_OO'],
  ['through','F_OO'],['pursue','F_OO'],['renew','F_OO'],['tattoo','F_OO'],
  ['voodoo','F_OO'],['bamboo','F_OO'],['shampoo','F_OO'],['taboo','F_OO'],
  ['breakthrough','F_OO'],['debut','F_OO'],['revenue','F_OO'],['avenue','F_OO'],
  ['continue','F_OO'],['goo','F_OO'],['boo','F_OO'],['zoo','F_OO'],['woo','F_OO'],
  ['dew','F_OO'],['brew','F_OO'],['crew','F_OO'],['flew','F_OO'],['glue','F_OO'],
  ['clue','F_OO'],['due','F_OO'],['hue','F_OO'],['sue','F_OO'],['cue','F_OO'],
  ['construe','F_OO'],['misconstrue','F_OO'],['overdue','F_OO'],['residue','F_OO'],

  // F_OOL
  ['cool','F_OOL'],['fool','F_OOL'],['pool','F_OOL'],['rule','F_OOL'],
  ['school','F_OOL'],['tool','F_OOL'],['fuel','F_OOL'],['cruel','F_OOL'],
  ['dual','F_OOL'],['jewel','F_OOL'],['overrule','F_OOL'],['carpool','F_OOL'],
  ['whirlpool','F_OOL'],['deadpool','F_OOL'],

  // F_OOM
  ['room','F_OOM'],['doom','F_OOM'],['bloom','F_OOM'],['boom','F_OOM'],
  ['zoom','F_OOM'],['loom','F_OOM'],['gloom','F_OOM'],['tomb','F_OOM'],
  ['womb','F_OOM'],['mushroom','F_OOM'],['bedroom','F_OOM'],['bathroom','F_OOM'],
  ['classroom','F_OOM'],['showroom','F_OOM'],['legroom','F_OOM'],['perfume','F_OOM'],
  ['consume','F_OOM'],['resume','F_OOM'],['assume','F_OOM'],['costume','F_OOM'],

  // F_OON
  ['moon','F_OON'],['soon','F_OON'],['tune','F_OON'],['noon','F_OON'],
  ['spoon','F_OON'],['balloon','F_OON'],['cartoon','F_OON'],['typhoon','F_OON'],
  ['cocoon','F_OON'],['honeymoon','F_OON'],['afternoon','F_OON'],['monsoon','F_OON'],
  ['bassoon','F_OON'],['platoon','F_OON'],['immune','F_OON'],['commune','F_OON'],

  // F_OOD
  ['good','F_OOD'],['could','F_OOD'],['should','F_OOD'],['would','F_OOD'],
  ['hood','F_OOD'],['stood','F_OOD'],['understood','F_OOD'],['misunderstood','F_OOD'],
  ['childhood','F_OOD'],['neighborhood','F_OOD'],['likelihood','F_OOD'],
  ['brotherhood','F_OOD'],['sisterhood','F_OOD'],['livelihood','F_OOD'],

  // F_US
  ['bus','F_US'],['plus','F_US'],['thus','F_US'],['fuss','F_US'],
  ['discuss','F_US'],['cuss','F_US'],['muss','F_US'],['us','F_US'],
  ['focus','F_US'],['bonus','F_US'],['status','F_US'],['campus','F_US'],
  ['virus','F_US'],['minus','F_US'],['famous','F_US'],['nervous','F_US'],
  ['serious','F_US'],['obvious','F_US'],['curious','F_US'],['previous','F_US'],
  ['various','F_US'],['genius','F_US'],['radius','F_US'],['stimulus','F_US'],
  ['consensus','F_US'],['apparatus','F_US'],['prospectus','F_US'],

  // F_UV (love / rough family)
  ['love','F_UV'],['above','F_UV'],['shove','F_UV'],['dove','F_UV'],
  ['glove','F_UV'],['enough','F_UV'],['tough','F_UV'],['stuff','F_UV'],
  ['rough','F_UV'],['bluff','F_UV'],['gruff','F_UV'],['puff','F_UV'],
  ['fluff','F_UV'],['rebuff','F_UV'],['handcuff','F_UV'],

  // F_UG
  ['hug','F_UG'],['bug','F_UG'],['drug','F_UG'],['plug','F_UG'],
  ['shrug','F_UG'],['slug','F_UG'],['snug','F_UG'],['thug','F_UG'],
  ['tug','F_UG'],['mug','F_UG'],['jug','F_UG'],['rug','F_UG'],
  ['earplugs','F_UG'],['bedbug','F_UG'],['humbug','F_UG'],['firebug','F_UG'],

  // F_UN
  ['run','F_UN'],['sun','F_UN'],['fun','F_UN'],['gun','F_UN'],
  ['done','F_UN'],['one','F_UN'],['none','F_UN'],['begun','F_UN'],
  ['overcome','F_UN'],['undone','F_UN'],['everyone','F_UN'],['someone','F_UN'],
  ['outrun','F_UN'],['rerun','F_UN'],['homespun','F_UN'],['overdone','F_UN'],

  // F_UM
  ['come','F_UM'],['some','F_UM'],['become','F_UM'],['welcome','F_UM'],
  ['drum','F_UM'],['sum','F_UM'],['gum','F_UM'],['numb','F_UM'],
  ['thumb','F_UM'],['plumb','F_UM'],['dumb','F_UM'],['crumb','F_UM'],
  ['income','F_UM'],['outcome','F_UM'],['overcome','F_UM'],['succumb','F_UM'],

  // F_UNG / F_UNK
  ['young','F_UNG'],['hung','F_UNG'],['lung','F_UNG'],['sung','F_UNG'],
  ['rung','F_UNG'],['stung','F_UNG'],['strung','F_UNG'],['clung','F_UNG'],
  ['flung','F_UNG'],['tongue','F_UNG'],['among','F_UNG'],
  ['funk','F_UNK'],['drunk','F_UNK'],['trunk','F_UNK'],['junk','F_UNK'],
  ['bunk','F_UNK'],['skunk','F_UNK'],['punk','F_UNK'],['hunk','F_UNK'],
  ['sunk','F_UNK'],['shrunk','F_UNK'],['chunk','F_UNK'],['stunk','F_UNK'],

  // F_UST
  ['trust','F_UST'],['dust','F_UST'],['must','F_UST'],['just','F_UST'],
  ['rust','F_UST'],['bust','F_UST'],['gust','F_UST'],['crust','F_UST'],
  ['adjust','F_UST'],['robust','F_UST'],['disgust','F_UST'],['combust','F_UST'],
  ['entrust','F_UST'],['wanderlust','F_UST'],['sawdust','F_UST'],['stardust','F_UST'],

  // F_USH
  ['crush','F_USH'],['rush','F_USH'],['hush','F_USH'],['brush','F_USH'],
  ['flush','F_USH'],['gush','F_USH'],['lush','F_USH'],['plush','F_USH'],
  ['blush','F_USH'],['ambush','F_USH'],['onrush','F_USH'],['hairbrush','F_USH'],
  ['paintbrush','F_USH'],['toothbrush','F_USH'],

  // F_OCK
  ['rock','F_OCK'],['clock','F_OCK'],['block','F_OCK'],['shock','F_OCK'],
  ['knock','F_OCK'],['lock','F_OCK'],['stock','F_OCK'],['mock','F_OCK'],
  ['dock','F_OCK'],['flock','F_OCK'],['smock','F_OCK'],['padlock','F_OCK'],
  ['deadlock','F_OCK'],['gridlock','F_OCK'],['dreadlock','F_OCK'],['shamrock','F_OCK'],
  ["o'clock",'F_OCK'],['livestock','F_OCK'],['overstock','F_OCK'],

  // F_OP
  ['stop','F_OP'],['drop','F_OP'],['hop','F_OP'],['pop','F_OP'],
  ['top','F_OP'],['shop','F_OP'],['crop','F_OP'],['prop','F_OP'],
  ['mop','F_OP'],['cop','F_OP'],['flop','F_OP'],['chop','F_OP'],
  ['rooftop','F_OP'],['laptop','F_OP'],['desktop','F_OP'],['nonstop','F_OP'],
  ['raindrop','F_OP'],['teardrop','F_OP'],['backdrop','F_OP'],['workshop','F_OP'],

  // F_ACK
  ['back','F_ACK'],['track','F_ACK'],['black','F_ACK'],['crack','F_ACK'],
  ['attack','F_ACK'],['stack','F_ACK'],['lack','F_ACK'],['pack','F_ACK'],
  ['rack','F_ACK'],['snack','F_ACK'],['shack','F_ACK'],['whack','F_ACK'],
  ['setback','F_ACK'],['flashback','F_ACK'],['throwback','F_ACK'],['playback','F_ACK'],
  ['feedback','F_ACK'],['comeback','F_ACK'],['drawback','F_ACK'],['cutback','F_ACK'],
  ['racetrack','F_ACK'],['soundtrack','F_ACK'],['quarterback','F_ACK'],['paperback','F_ACK'],

  // F_AP
  ['rap','F_AP'],['cap','F_AP'],['map','F_AP'],['gap','F_AP'],
  ['trap','F_AP'],['snap','F_AP'],['clap','F_AP'],['wrap','F_AP'],
  ['overlap','F_AP'],['mishap','F_AP'],['kneecap','F_AP'],['hubcap','F_AP'],
  ['nightcap','F_AP'],['skullcap','F_AP'],['bootstrap','F_AP'],['deathtrap','F_AP'],
  ['tap','F_AP'],['nap','F_AP'],['sap','F_AP'],['yap','F_AP'],['zap','F_AP'],
  ['strap','F_AP'],['flap','F_AP'],['slap','F_AP'],['handicap','F_AP'],

  // F_ASH
  ['crash','F_ASH'],['flash','F_ASH'],['clash','F_ASH'],['bash','F_ASH'],
  ['cash','F_ASH'],['dash','F_ASH'],['lash','F_ASH'],['rash','F_ASH'],
  ['smash','F_ASH'],['trash','F_ASH'],['splash','F_ASH'],['gnash','F_ASH'],
  ['eyelash','F_ASH'],['whiplash','F_ASH'],['backlash','F_ASH'],['rehash','F_ASH'],

  // F_AT
  ['that','F_AT'],['flat','F_AT'],['bat','F_AT'],['cat','F_AT'],
  ['fat','F_AT'],['hat','F_AT'],['mat','F_AT'],['pat','F_AT'],
  ['rat','F_AT'],['sat','F_AT'],['spat','F_AT'],['combat','F_AT'],
  ['format','F_AT'],['doormat','F_AT'],['acrobat','F_AT'],['diplomat','F_AT'],
  ['democrat','F_AT'],['bureaucrat','F_AT'],['autocrat','F_AT'],

  // F_AN
  ['man','F_AN'],['can','F_AN'],['plan','F_AN'],['ran','F_AN'],
  ['scan','F_AN'],['span','F_AN'],['tan','F_AN'],['van','F_AN'],
  ['began','F_AN'],['demand','F_AN'],['expand','F_AN'],['understand','F_AN'],
  ['caravan','F_AN'],['partisan','F_AN'],['veteran','F_AN'],['catamaran','F_AN'],

  // F_AM
  ['am','F_AM'],['jam','F_AM'],['slam','F_AM'],['gram','F_AM'],
  ['program','F_AM'],['diagram','F_AM'],['telegram','F_AM'],['instagram','F_AM'],
  ['exam','F_AM'],['scam','F_AM'],['damn','F_AM'],['clam','F_AM'],

  // F_AIR
  ['air','F_AIR'],['care','F_AIR'],['share','F_AIR'],['there','F_AIR'],
  ['where','F_AIR'],['bare','F_AIR'],['dare','F_AIR'],['fair','F_AIR'],
  ['hair','F_AIR'],['pair','F_AIR'],['rare','F_AIR'],['stare','F_AIR'],
  ['aware','F_AIR'],['declare','F_AIR'],['prepare','F_AIR'],['compare','F_AIR'],
  ['nightmare','F_AIR'],['welfare','F_AIR'],['beware','F_AIR'],['software','F_AIR'],
  ['hardware','F_AIR'],['somewhere','F_AIR'],['everywhere','F_AIR'],['anywhere','F_AIR'],
  ['nowhere','F_AIR'],['affair','F_AIR'],['unfair','F_AIR'],['repair','F_AIR'],
  ['despair','F_AIR'],['impair','F_AIR'],['millionaire','F_AIR'],['billionaire','F_AIR'],

  // F_EAR
  ['hear','F_EAR'],['fear','F_EAR'],['near','F_EAR'],['clear','F_EAR'],
  ['year','F_EAR'],['gear','F_EAR'],['tear','F_EAR'],['dear','F_EAR'],
  ['peer','F_EAR'],['appear','F_EAR'],['career','F_EAR'],['sincere','F_EAR'],
  ['severe','F_EAR'],['premiere','F_EAR'],['atmosphere','F_EAR'],['hemisphere','F_EAR'],
  ['volunteer','F_EAR'],['persevere','F_EAR'],['engineer','F_EAR'],['pioneer','F_EAR'],
  ['disappear','F_EAR'],['reappear','F_EAR'],

  // F_ART
  ['art','F_ART'],['heart','F_ART'],['start','F_ART'],['part','F_ART'],
  ['smart','F_ART'],['chart','F_ART'],['apart','F_ART'],['depart','F_ART'],
  ['restart','F_ART'],['heartbeat','F_ART'],['sweetheart','F_ART'],['counterpart','F_ART'],
  ['upstart','F_ART'],['walmart','F_ART'],['rampart','F_ART'],['impart','F_ART'],

  // F_ARK
  ['dark','F_ARK'],['park','F_ARK'],['mark','F_ARK'],['spark','F_ARK'],
  ['bark','F_ARK'],['stark','F_ARK'],['shark','F_ARK'],['remark','F_ARK'],
  ['landmark','F_ARK'],['trademark','F_ARK'],['hallmark','F_ARK'],['benchmark','F_ARK'],
  ['ballpark','F_ARK'],['aardvark','F_ARK'],['earmark','F_ARK'],['postmark','F_ARK'],

  // F_ALL
  ['fall','F_ALL'],['call','F_ALL'],['ball','F_ALL'],['wall','F_ALL'],
  ['hall','F_ALL'],['tall','F_ALL'],['small','F_ALL'],['recall','F_ALL'],
  ['install','F_ALL'],['overall','F_ALL'],['waterfall','F_ALL'],['rainfall','F_ALL'],
  ['downfall','F_ALL'],['nightfall','F_ALL'],['footfall','F_ALL'],['windfall','F_ALL'],
  ['freefall','F_ALL'],['snowfall','F_ALL'],['pitfall','F_ALL'],['shortfall','F_ALL'],

  // F_ORE
  ['more','F_ORE'],['floor','F_ORE'],['before','F_ORE'],['door','F_ORE'],
  ['pour','F_ORE'],['ignore','F_ORE'],['explore','F_ORE'],['restore','F_ORE'],
  ['therefore','F_ORE'],['furthermore','F_ORE'],['offshore','F_ORE'],['onshore','F_ORE'],
  ['hardcore','F_ORE'],['folklore','F_ORE'],['adore','F_ORE'],['implore','F_ORE'],
  ['deplore','F_ORE'],['sophomore','F_ORE'],['carnivore','F_ORE'],['dinosaur','F_ORE'],

  // F_ORN
  ['born','F_ORN'],['torn','F_ORN'],['worn','F_ORN'],['sworn','F_ORN'],
  ['corn','F_ORN'],['horn','F_ORN'],['warn','F_ORN'],['scorn','F_ORN'],
  ['acorn','F_ORN'],['unicorn','F_ORN'],['popcorn','F_ORN'],['longhorn','F_ORN'],
  ['firstborn','F_ORN'],['newborn','F_ORN'],['stillborn','F_ORN'],['reborn','F_ORN'],
  ['lovelorn','F_ORN'],['forlorn','F_ORN'],['adorn','F_ORN'],

  // F_ORT
  ['court','F_ORT'],['sport','F_ORT'],['short','F_ORT'],['fort','F_ORT'],
  ['sort','F_ORT'],['port','F_ORT'],['support','F_ORT'],['report','F_ORT'],
  ['resort','F_ORT'],['transport','F_ORT'],['export','F_ORT'],['import','F_ORT'],
  ['passport','F_ORT'],['airport','F_ORT'],['seaport','F_ORT'],['escort','F_ORT'],

  // F_EAT
  ['beat','F_EAT'],['heat','F_EAT'],['street','F_EAT'],['meet','F_EAT'],
  ['sweet','F_EAT'],['treat','F_EAT'],['defeat','F_EAT'],['repeat','F_EAT'],
  ['complete','F_EAT'],['heartbeat','F_EAT'],['compete','F_EAT'],['delete','F_EAT'],
  ['concrete','F_EAT'],['discreet','F_EAT'],['retreat','F_EAT'],['athlete','F_EAT'],
  ['obsolete','F_EAT'],['incomplete','F_EAT'],['bittersweet','F_EAT'],

  // F_AKE
  ['make','F_AKE'],['take','F_AKE'],['shake','F_AKE'],['wake','F_AKE'],
  ['break','F_AKE'],['fake','F_AKE'],['lake','F_AKE'],['sake','F_AKE'],
  ['bake','F_AKE'],['cake','F_AKE'],['mistake','F_AKE'],['forsake','F_AKE'],
  ['heartbreak','F_AKE'],['daybreak','F_AKE'],['outbreak','F_AKE'],['overtake','F_AKE'],
  ['undertake','F_AKE'],['handshake','F_AKE'],['namesake','F_AKE'],['keepsake','F_AKE'],

  // F_ILE
  ['while','F_ILE'],['style','F_ILE'],['mile','F_ILE'],['smile','F_ILE'],
  ['file','F_ILE'],['trial','F_ILE'],['denial','F_ILE'],['worthwhile','F_ILE'],
  ['lifestyle','F_ILE'],['freestyle','F_ILE'],['versatile','F_ILE'],['juvenile','F_ILE'],
  ['reconcile','F_ILE'],['domicile','F_ILE'],['projectile','F_ILE'],

  // F_SHUN
  ['nation','F_SHUN'],['passion','F_SHUN'],['motion','F_SHUN'],['ocean','F_SHUN'],
  ['notion','F_SHUN'],['potion','F_SHUN'],['action','F_SHUN'],['fraction','F_SHUN'],
  ['traction','F_SHUN'],['reaction','F_SHUN'],['attraction','F_SHUN'],['distraction','F_SHUN'],
  ['satisfaction','F_SHUN'],['transaction','F_SHUN'],['imagination','F_SHUN'],
  ['dedication','F_SHUN'],['celebration','F_SHUN'],['generation','F_SHUN'],
  ['conversation','F_SHUN'],['inspiration','F_SHUN'],['foundation','F_SHUN'],
  ['determination','F_SHUN'],['transformation','F_SHUN'],['manifestation','F_SHUN'],

  // F_AZR
  ['laser','F_AZR'],['razor','F_AZR'],['blazer','F_AZR'],['eraser','F_AZR'],
  ['chaser','F_AZR'],['tracer','F_AZR'],['racer','F_AZR'],['spacer','F_AZR'],
  ['pacer','F_AZR'],['bracer','F_AZR'],
]

const FAMILY_PATTERNS = [
  ['ight', 'F_IGHT'], ['ite', 'F_ITE'], ['ype', 'F_YPE'], ['ipe', 'F_IPE'],
  ['ame', 'F_AME'], ['ain', 'F_AIN'], ['ane', 'F_ANE'], ['ace', 'F_ACE'],
  ['ase', 'F_ACE'], ['ay', 'F_AY'], ['aze', 'F_AZE'],
  ['een', 'F_EEN'], ['ean', 'F_EEN'], ['eem', 'F_EEN'], ['eam', 'F_EEN'],
  ['eel', 'F_EEL'], ['eal', 'F_EEL'], ['eed', 'F_EED'], ['ead', 'F_EED'],
  ['eep', 'F_EEP'], ['eek', 'F_EEK'], ['eak', 'F_EEK'],
  ['ell', 'F_ELL'], ['elt', 'F_ELT'], ['end', 'F_END'], ['ent', 'F_ENT'],
  ['ess', 'F_ESS'], ['est', 'F_EST'],
  ['ine', 'F_INE'], ['ime', 'F_IME'], ['ire', 'F_IRE'], ['ile', 'F_ILE'],
  ['ill', 'F_ILL'], ['ing', 'F_ING'], ['ink', 'F_INK'], ['int', 'F_INT'],
  ['ip', 'F_IP'], ['it', 'F_IT'], ['ig', 'F_IG'], ['id', 'F_ID'],
  ['ove', 'F_UV'], ['uff', 'F_UV'], ['ug', 'F_UG'], ['ub', 'F_UB'],
  ['un', 'F_UN'], ['um', 'F_UM'], ['ung', 'F_UNG'], ['unk', 'F_UNK'],
  ['ust', 'F_UST'], ['ush', 'F_USH'], ['us', 'F_US'], ['ut', 'F_UT'],
  ['one', 'F_ONE'], ['ong', 'F_ONG'], ['ock', 'F_OCK'], ['op', 'F_OP'],
  ['ot', 'F_OT'], ['ob', 'F_OB'], ['og', 'F_OG'],
  ['old', 'F_OLD'], ['ole', 'F_OLD'], ['oll', 'F_OLD'], ['oal', 'F_OLD'],
  ['ound', 'F_OUND'], ['own', 'F_OWN'], ['out', 'F_OUT'], ['ow', 'F_OW'],
  ['ood', 'F_OOD'], ['ool', 'F_OOL'], ['oom', 'F_OOM'], ['oon', 'F_OON'],
  ['oo', 'F_OO'], ['ew', 'F_OO'], ['ue', 'F_OO'],
  ['orn', 'F_ORN'], ['ore', 'F_ORE'], ['ort', 'F_ORT'], ['ord', 'F_ORD'],
  ['art', 'F_ART'], ['ark', 'F_ARK'], ['ard', 'F_ARD'], ['arm', 'F_ARM'],
  ['all', 'F_ALL'], ['alk', 'F_ALL'], ['aul', 'F_AUL'],
  ['ack', 'F_ACK'], ['act', 'F_ACT'], ['ap', 'F_AP'], ['ab', 'F_AB'],
  ['at', 'F_AT'], ['an', 'F_AN'], ['am', 'F_AM'], ['ash', 'F_ASH'],
  ['air', 'F_AIR'], ['are', 'F_AIR'], ['ear', 'F_EAR'],
  ['tion', 'F_SHUN'], ['sion', 'F_SHUN'], ['cian', 'F_SHUN'],
  ['azer', 'F_AZR'], ['aser', 'F_AZR'], ['azor', 'F_AZR'],

  // Extra accuracy helpers
  ['air', 'F_AIR'], ['ear', 'F_EAR'], ['ure', 'F_OO'], ['ier', 'F_EAR'],
  ['ite', 'F_ITE'], ['ide', 'F_ID'], ['int', 'F_INT'], ['elt', 'F_ELT'],
  ['ord', 'F_ORD'], ['ard', 'F_ARD'], ['arm', 'F_ARM'], ['aul', 'F_AUL'],
  ['ub', 'F_UB'], ['ut', 'F_UT'], ['ob', 'F_OB'], ['og', 'F_OG'], ['ot', 'F_OT'],
]

const NEAR_FAMILY_MAP = {
  'F_IGHT': ['F_ITE', 'F_IPE', 'F_INE'],
  'F_ITE': ['F_IGHT', 'F_IPE', 'F_INE'],
  'F_IPE': ['F_ITE', 'F_IGHT', 'F_INE'],
  'F_YPE': ['F_IPE', 'F_ITE', 'F_IGHT'],
  'F_EEN': ['F_EEL', 'F_EED', 'F_EEP', 'F_EEK'],
  'F_EEL': ['F_EEN', 'F_EED', 'F_EEP'],
  'F_EED': ['F_EEN', 'F_EEL', 'F_EEP'],
  'F_EEP': ['F_EEN', 'F_EEL', 'F_EED'],
  'F_EEK': ['F_EEN', 'F_EED', 'F_EEP'],
  'F_AIN': ['F_ANE', 'F_AME', 'F_ACE', 'F_AY'],
  'F_ANE': ['F_AIN', 'F_AME', 'F_ACE'],
  'F_AME': ['F_AIN', 'F_ANE', 'F_AY'],
  'F_AY': ['F_AIN', 'F_AME', 'F_ACE', 'F_AZE'],
  'F_AZE': ['F_AY', 'F_ACE', 'F_AIN'],
  'F_ACE': ['F_AIN', 'F_AY', 'F_AZE', 'F_ANE'],
  'F_INE': ['F_IME', 'F_IRE', 'F_IGHT', 'F_ILE'],
  'F_IME': ['F_INE', 'F_IRE', 'F_ILE'],
  'F_IRE': ['F_INE', 'F_IME', 'F_ILE'],
  'F_ILL': ['F_ING', 'F_INK', 'F_IP', 'F_IT'],
  'F_ING': ['F_ILL', 'F_INK', 'F_INT'],
  'F_INK': ['F_ING', 'F_ILL', 'F_INT'],
  'F_OLD': ['F_ONE', 'F_ONG', 'F_ORE'],
  'F_ONE': ['F_OLD', 'F_ONG', 'F_ORE', 'F_OW'],
  'F_OW': ['F_ONE', 'F_OLD', 'F_ONG'],
  'F_OO': ['F_OOL', 'F_OOM', 'F_OON', 'F_OOD'],
  'F_OOL': ['F_OO', 'F_OOM', 'F_OON'],
  'F_OOM': ['F_OO', 'F_OOL', 'F_OON'],
  'F_OON': ['F_OO', 'F_OOM', 'F_OOL'],
  'F_UST': ['F_USH', 'F_UV', 'F_UG', 'F_UN'],
  'F_UN': ['F_UM', 'F_UST', 'F_UNG', 'F_UV', 'F_SHUN'],
  'F_UM': ['F_UN', 'F_UNG', 'F_UB'],
  'F_ACK': ['F_AP', 'F_AT', 'F_ASH', 'F_AB'],
  'F_ALL': ['F_ORE', 'F_ORT', 'F_ORN'],
  'F_ART': ['F_ARK', 'F_ARM', 'F_ARD'],
  'F_ORE': ['F_ORN', 'F_ORT', 'F_OLD', 'F_ALL'],
  'F_AIR': ['F_EAR', 'F_ACE', 'F_AY', 'F_AZR'],
  'F_SHUN': ['F_UN', 'F_ONE'],
  'F_AZR': ['F_AZE', 'F_AIR', 'F_EAR'],
  'F_ITE': ['F_IGHT', 'F_IPE', 'F_INE'],
  'F_ID': ['F_ILL', 'F_IT', 'F_IG'],
  'F_INT': ['F_ING', 'F_INK', 'F_ILL'],
  'F_ELT': ['F_ELL', 'F_EST', 'F_END'],
  'F_ORD': ['F_ORE', 'F_ORT', 'F_ORN'],
  'F_ARD': ['F_ART', 'F_ARK', 'F_ARM'],
  'F_ARM': ['F_ART', 'F_ARK', 'F_ARD'],
  'F_AUL': ['F_ALL', 'F_AIR'],
  'F_UB': ['F_UV', 'F_UG', 'F_UM'],
  'F_UT': ['F_UST', 'F_USH', 'F_UG'],
  'F_OB': ['F_OCK', 'F_OP', 'F_OG'],
  'F_OG': ['F_OCK', 'F_OP', 'F_OT'],
  'F_OT': ['F_OCK', 'F_OP', 'F_OB'],
}

const VOWEL_SOUND_MAP = {
  'long_i': ['F_IGHT','F_ITE','F_INE','F_IME','F_IRE','F_ILE','F_YPE','F_IPE'],
  'long_a': ['F_AY','F_AIN','F_ANE','F_AME','F_ACE','F_AZE','F_AIR','F_AZR'],
  'long_e': ['F_EEN','F_EEL','F_EED','F_EEP','F_EEK','F_ELL','F_ELT'],
  'long_o': ['F_ONE','F_OLD','F_OW','F_ONG','F_ORE','F_ORN','F_ORD'],
  'long_u': ['F_OO','F_OOL','F_OOM','F_OON','F_OOD','F_UE'],
  'short_i': ['F_ILL','F_ING','F_INK','F_IP','F_IT','F_IG','F_ID','F_INT'],
  'short_a': ['F_ACK','F_AP','F_AB','F_AT','F_AN','F_AM','F_ASH','F_AUL'],
  'short_o': ['F_OCK','F_OP','F_OT','F_OB','F_OG'],
  'short_u': ['F_UST','F_USH','F_UV','F_UG','F_UB','F_UN','F_UM','F_UNG','F_UNK','F_US','F_UT','F_SHUN'],
  'ar_sound': ['F_ART','F_ARK','F_ARD','F_ARM'],
  'aw_sound': ['F_ALL','F_ORT','F_ORD'],
  'ow_sound': ['F_OUND','F_OWN','F_OUT','F_OW'],
  'ood_sound': ['F_OOD'],
  'air_sound': ['F_AIR','F_EAR'],
  'shun_sound': ['F_SHUN'],
}

const RHYME_CACHE = Object.create(null)
const FAMILY_CACHE = Object.create(null)
const SYLLABLE_CACHE = Object.create(null)

const WORD_TO_FAMILY = Object.create(null)
const FAMILY_TO_WORDS = Object.create(null)
const VOWEL_SOUND_TO_FAMILIES = Object.create(null)
const SORTED_FAMILY_PATTERNS = [...FAMILY_PATTERNS].sort((a, b) => b[0].length - a[0].length)

for (const [word, family] of RHYME_DICTIONARY) {
  WORD_TO_FAMILY[word] = family
  if (!FAMILY_TO_WORDS[family]) FAMILY_TO_WORDS[family] = []
  FAMILY_TO_WORDS[family].push(word)
}

for (const [sound, families] of Object.entries(VOWEL_SOUND_MAP)) {
  VOWEL_SOUND_TO_FAMILIES[sound] = families.slice()
}

const EXCEPTION_SYLLABLES = {
  business: 2,
  every: 2,
  family: 3,
  beautiful: 3,
  chocolate: 2,
  people: 2,
  queue: 1,
  rhythm: 2,
  fire: 1,
  hour: 1,
  our: 1,
  world: 1,
  again: 2,
  because: 2,
  camera: 3,
  different: 3,
  interesting: 3,
  restaurant: 3,
  memory: 3,
  poem: 2,
  poetry: 3,
  little: 2,
  bottle: 2,
  apple: 2,
  table: 2,
  comfortable: 3,
  umbrella: 3,
  without: 2,
  overtime: 3,
  ordinary: 4,
  everybodys: 4,
  everybody: 4,
  anything: 2,
  something: 2,
  nothing: 2,
  somewhere: 2,
}

const THEME_KEYWORDS = {
  hustle: ['grind', 'grinding', 'hustle', 'hustlin', 'hustling', 'work', 'working', 'struggle', 'pressure', 'build', 'building', 'chase', 'chasing', 'paper', 'stack', 'late', 'night'],
  love: ['love', 'loved', 'heart', 'baby', 'kiss', 'touch', 'romance', 'desire', 'passion', 'forever', 'darling', 'bae', 'lover', 'crush', 'feel'],
  introspective: ['night', 'alone', 'lonely', 'quiet', 'thinking', 'think', 'thought', 'thoughts', 'mirror', 'shadow', 'mind', 'memory', 'memories', 'reflect', 'silence', 'dream'],
  money: ['money', 'cash', 'racks', 'bands', 'paper', 'drip', 'ice', 'flex', 'rich', 'wealth', 'stack', 'profit', 'coin', 'pay', 'paid', 'bling'],
  pain: ['pain', 'hurt', 'scar', 'scars', 'broken', 'tears', 'cry', 'loss', 'suffer', 'healing', 'wound', 'bleed', 'missing', 'hurtin'],
  victory: ['win', 'winning', 'rise', 'rising', 'climb', 'champion', 'crown', 'top', 'success', 'victory', 'shine', 'prove', 'achieve', 'victorious'],
}

const GENERIC_SUGGESTION_BANK = {
  tight: [
    'Still chasing the {rhyme}',
    'I been moving for the {rhyme}',
    'Built from nothing to the {rhyme}',
  ],
  balanced: [
    'I been grinding every {rhyme}',
    'Turned the pressure into {rhyme}',
    'Kept my focus through the {rhyme}',
  ],
  loose: [
    'I been grinding every single {rhyme}',
    'Turned every setback into {rhyme}',
    'Kept my head up through the {rhyme}',
  ],
}

const FAMILY_SUGGESTION_BANK = {
  F_IGHT: {
    tight: [
      'Now I’m shining in the {rhyme}',
      'Turned the struggle into {rhyme}',
      'Built my way through the {rhyme}',
    ],
    balanced: [
      'I been moving through the {rhyme}',
      'Turned the pressure into {rhyme}',
      'Made the dark feel like {rhyme}',
    ],
    loose: [
      'I been shining through the {rhyme} all night',
      'Turned every setback into {rhyme} tonight',
      'Built my lane and made it feel {rhyme}',
    ],
  },
  F_INE: {
    tight: [
      'I keep my focus on the {rhyme}',
      'Now the whole world feels {rhyme}',
      'I been chasing what feels {rhyme}',
    ],
    balanced: [
      'I keep my circle clean and {rhyme}',
      'Now the picture coming in {rhyme}',
      'Every move I make stays {rhyme}',
    ],
    loose: [
      'I keep my vision sharp and {rhyme}',
      'Now the future looking more {rhyme}',
      'I been building something {rhyme}',
    ],
  },
  F_AY: {
    tight: [
      'I been moving every {rhyme}',
      'Turned the setback into {rhyme}',
      'Found a better way to {rhyme}',
    ],
    balanced: [
      'I been moving every single {rhyme}',
      'Turned the pressure into {rhyme}',
      'Found a better way through the {rhyme}',
    ],
    loose: [
      'I been moving every single day to the {rhyme}',
      'Turned the setback into something I could {rhyme}',
      'Found a better way to make it all {rhyme}',
    ],
  },
  F_EEN: {
    tight: [
      'I keep it clean and {rhyme}',
      'Now the whole scene is {rhyme}',
      'I been staying in the {rhyme}',
    ],
    balanced: [
      'I keep the vision clear and {rhyme}',
      'Now the whole team moving {rhyme}',
      'I been keeping it steady and {rhyme}',
    ],
    loose: [
      'I keep the vision clear and the motion {rhyme}',
      'Now the whole team moving like a {rhyme}',
      'I been staying in my lane and making it {rhyme}',
    ],
  },
  F_OO: {
    tight: [
      'I keep it moving with the {rhyme}',
      'Now I’m seeing clear as the {rhyme}',
      'I been chasing something new and {rhyme}',
    ],
    balanced: [
      'I keep it moving through the {rhyme}',
      'Now the whole crew feel {rhyme}',
      'I been seeing everything more {rhyme}',
    ],
    loose: [
      'I keep it moving through the {rhyme} all night',
      'Now the whole crew feel brand new and {rhyme}',
      'I been seeing everything from a better {rhyme}',
    ],
  },
  F_OW: {
    tight: [
      'I keep it moving with the {rhyme}',
      'Now the whole room feeling {rhyme}',
      'I been growing as I {rhyme}',
    ],
    balanced: [
      'I keep it moving through the {rhyme}',
      'Now the whole story feeling {rhyme}',
      'I been growing while I {rhyme}',
    ],
    loose: [
      'I keep it moving through the storm and the {rhyme}',
      'Now the whole story bends but never {rhyme}',
      'I been growing while the world around me {rhyme}',
    ],
  },
  F_ORE: {
    tight: [
      'I keep reaching for more',
      'Now I’m standing at the door',
      'I was built to go further than before',
    ],
    balanced: [
      'I keep reaching for more',
      'Now I’m knocking on the door',
      'I was built to go deeper than before',
    ],
    loose: [
      'I keep reaching for more and more',
      'Now I’m knocking on the door',
      'I was built to go deeper than before',
    ],
  },
  F_OCK: {
    tight: [
      'I keep it solid like a {rhyme}',
      'Now the whole room feeling {rhyme}',
      'I was made to shake the {rhyme}',
    ],
    balanced: [
      'I keep it solid like a {rhyme}',
      'Now the whole block feeling {rhyme}',
      'I was made to move the {rhyme}',
    ],
    loose: [
      'I keep it solid like a {rhyme} all day',
      'Now the whole block feeling {rhyme}',
      'I was made to shake the {rhyme} away',
    ],
  },
  F_ACK: {
    tight: [
      'I’m coming back with the {rhyme}',
      'Built it strong from the {rhyme}',
      'I never fold, I stay {rhyme}',
    ],
    balanced: [
      'I’m coming back with the {rhyme}',
      'Built it strong from the {rhyme}',
      'I never fold, I keep it {rhyme}',
    ],
    loose: [
      'I’m coming back with the {rhyme} on my mind',
      'Built it strong from the ground and stayed {rhyme}',
      'I never fold, I keep it locked and {rhyme}',
    ],
  },
  F_ART: {
    tight: [
      'I keep the fire in my {rhyme}',
      'Now the whole room got a {rhyme}',
      'I been moving from the {rhyme}',
    ],
    balanced: [
      'I keep the fire in my {rhyme}',
      'Now the whole room got a {rhyme}',
      'I been moving from the {rhyme}',
    ],
    loose: [
      'I keep the fire in my {rhyme} all night',
      'Now the whole room got a {rhyme}',
      'I been moving from the {rhyme} to the light',
    ],
  },
  F_AIR: {
    tight: [
      'I keep it level in the {rhyme}',
      'Now the whole city feel {rhyme}',
      'I’m moving with no {rhyme}',
    ],
    balanced: [
      'I keep it level in the {rhyme}',
      'Now the whole city feel more {rhyme}',
      'I’m moving with no fear or {rhyme}',
    ],
    loose: [
      'I keep it level in the {rhyme} tonight',
      'Now the whole city feel more {rhyme}',
      'I’m moving with no fear or doubt or {rhyme}',
    ],
  },
  F_UV: {
    tight: [
      'I keep it warm in the {rhyme}',
      'Now I’m rising up above',
      'I been moving with the {rhyme}',
    ],
    balanced: [
      'I keep it warm in the {rhyme}',
      'Now I’m rising up above',
      'I been moving with a little more {rhyme}',
    ],
    loose: [
      'I keep it warm in the {rhyme} and never fold',
      'Now I’m rising up above',
      'I been moving with a heart that stays {rhyme}',
    ],
  },
  F_US: {
    tight: [
      'I keep it honest in the {rhyme}',
      'Now the whole room feeling {rhyme}',
      'I been moving with no {rhyme}',
    ],
    balanced: [
      'I keep it honest in the {rhyme}',
      'Now the whole room feeling more {rhyme}',
      'I been moving with no fear or {rhyme}',
    ],
    loose: [
      'I keep it honest in the {rhyme} all day',
      'Now the whole room feeling more {rhyme}',
      'I been moving with no fear or doubt in the way',
    ],
  },
  F_UST: {
    tight: [
      'I keep it solid through the {rhyme}',
      'Now the whole thing feel {rhyme}',
      'I been moving with the {rhyme}',
    ],
    balanced: [
      'I keep it solid through the {rhyme}',
      'Now the whole thing feel more {rhyme}',
      'I been moving with the kind of {rhyme}',
    ],
    loose: [
      'I keep it solid through the {rhyme} and never fold',
      'Now the whole thing feel more {rhyme}',
      'I been moving with the kind of focus made of {rhyme}',
    ],
  },
  F_ING: {
    tight: [
      'I keep it ringing through the {rhyme}',
      'Now the whole room feel {rhyme}',
      'I been moving like a {rhyme}',
    ],
    balanced: [
      'I keep it ringing through the {rhyme}',
      'Now the whole room feel more {rhyme}',
      'I been moving like a steady {rhyme}',
    ],
    loose: [
      'I keep it ringing through the {rhyme} tonight',
      'Now the whole room feel more {rhyme}',
      'I been moving like a steady {rhyme} in the light',
    ],
  },
  F_ILL: {
    tight: [
      'I keep it steady on the {rhyme}',
      'Now the whole room feels {rhyme}',
      'I been moving up the {rhyme}',
    ],
    balanced: [
      'I keep it steady on the {rhyme}',
      'Now the whole room feels more {rhyme}',
      'I been moving up the {rhyme}',
    ],
    loose: [
      'I keep it steady on the {rhyme} tonight',
      'Now the whole room feels more {rhyme}',
      'I been moving up the {rhyme} with all my might',
    ],
  },
  F_INE: {
    tight: [
      'I keep my focus on the {rhyme}',
      'Now the whole world feels {rhyme}',
      'I been chasing what feels {rhyme}',
    ],
    balanced: [
      'I keep my circle clean and {rhyme}',
      'Now the picture coming in {rhyme}',
      'Every move I make stays {rhyme}',
    ],
    loose: [
      'I keep my vision sharp and {rhyme}',
      'Now the future looking more {rhyme}',
      'I been building something {rhyme}',
    ],
  },
  default: GENERIC_SUGGESTION_BANK,
}

function normalizeWordForLookup(word) {
  if (!word) return ''
  let w = String(word).toLowerCase().trim()
  if (!w) return ''
  w = w.replace(/[’']/g, '')
  w = w.replace(/[^a-z-]/g, '')
  if (w.includes('-')) {
    const parts = w.split('-').filter(Boolean)
    if (parts.length) w = parts[parts.length - 1]
  }
  w = w.replace(/[^a-z]/g, '')
  return w
}

function getLastMeaningfulWord(input) {
  if (!input) return ''
  const text = String(input).trim()
  if (!text) return ''
  const parts = text.split(/\s+/).filter(Boolean)
  if (!parts.length) return ''
  return normalizeWordForLookup(parts[parts.length - 1])
}

function uniqueWords(list) {
  const seen = new Set()
  const out = []
  for (const item of list || []) {
    if (!item || seen.has(item)) continue
    seen.add(item)
    out.push(item)
  }
  return out
}

function uniqueByWord(list) {
  const seen = new Set()
  const out = []
  for (const item of list || []) {
    if (!item || !item.word) continue
    if (seen.has(item.word)) continue
    seen.add(item.word)
    out.push(item)
  }
  return out
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function commonSuffixLength(a, b) {
  const x = normalizeWordForLookup(a)
  const y = normalizeWordForLookup(b)
  const max = Math.min(x.length, y.length)
  let count = 0
  for (let i = 1; i <= max; i++) {
    if (x[x.length - i] !== y[y.length - i]) break
    count++
  }
  return count
}

function getFamilyVowelSound(family) {
  for (const [sound, families] of Object.entries(VOWEL_SOUND_MAP)) {
    if (families.includes(family)) return sound
  }
  return 'unknown'
}

function getNearFamilies(family) {
  return NEAR_FAMILY_MAP[family] || []
}

function areNearFamilies(a, b) {
  if (!a || !b) return false
  if (a === b) return true
  const nearA = getNearFamilies(a)
  const nearB = getNearFamilies(b)
  return nearA.includes(b) || nearB.includes(a)
}

function getVowelSoundSimilarity(a, b) {
  const soundA = getFamilyVowelSound(a)
  const soundB = getFamilyVowelSound(b)
  if (soundA === 'unknown' || soundB === 'unknown') return 0
  if (soundA === soundB) return 1
  const closePairs = new Set([
    `${soundA}:${soundB}`,
    `${soundB}:${soundA}`,
  ])
  const looseMatches = [
    ['long_i', 'air_sound'],
    ['long_a', 'air_sound'],
    ['long_o', 'ow_sound'],
    ['short_o', 'ow_sound'],
    ['short_u', 'long_u'],
    ['short_i', 'long_e'],
    ['long_e', 'air_sound'],
  ]
  for (const [x, y] of looseMatches) {
    if (closePairs.has(`${x}:${y}`)) return 0.55
  }
  return 0.35
}

function getFamilyRelationScore(a, b) {
  if (a === b) return 22
  if (areNearFamilies(a, b)) return 14
  if (getFamilyVowelSound(a) !== 'unknown' && getFamilyVowelSound(a) === getFamilyVowelSound(b)) return 9
  return 0
}

function scoreRhymeCandidate(inputWord, candidateWord, relationType = 'slant') {
  const source = normalizeWordForLookup(inputWord)
  const candidate = normalizeWordForLookup(candidateWord)
  if (!source || !candidate || source === candidate) return 0

  const inputFamily = detectFamily(source)
  const candidateFamily = detectFamily(candidate)
  const inputSyl = countWordSyllables(source)
  const candidateSyl = countWordSyllables(candidate)
  const suffix = commonSuffixLength(source, candidate)
  const suffixRatio = suffix / Math.max(3, Math.min(source.length, candidate.length))
  const syllableSimilarity = 1 - (Math.abs(inputSyl - candidateSyl) / Math.max(1, Math.max(inputSyl, candidateSyl)))
  const vowelSimilarity = getVowelSoundSimilarity(inputFamily, candidateFamily)
  const familyScore = getFamilyRelationScore(inputFamily, candidateFamily)

  const typeBase = {
    perfect: 58,
    near: 42,
    slant: 28,
    internal: 36,
  }[relationType] || 28

  let score =
    typeBase +
    familyScore +
    Math.round(vowelSimilarity * 12) +
    Math.round(suffixRatio * 22) +
    Math.round(clamp(syllableSimilarity, 0, 1) * 16)

  if (suffix >= 4) score += 6
  if (suffix >= 5) score += 4
  if (suffix >= 6) score += 4

  if (relationType === 'perfect' && inputFamily === candidateFamily) score += 8
  if (relationType === 'near' && areNearFamilies(inputFamily, candidateFamily)) score += 4
  if (relationType === 'slant' && getFamilyVowelSound(inputFamily) === getFamilyVowelSound(candidateFamily)) score += 4
  if (relationType === 'internal') score -= 2

  return clamp(Math.round(score), 0, 100)
}

function dedupeAndSortRhymeList(items, limit = 24) {
  const unique = uniqueByWord(items)
  unique.sort((a, b) => b.score - a.score || a.syllables - b.syllables || a.word.localeCompare(b.word))
  return unique.slice(0, limit)
}

function getCandidateWordsForFamilies(families) {
  const out = []
  const seen = new Set()
  for (const family of families || []) {
    const words = FAMILY_TO_WORDS[family] || []
    for (const word of words) {
      if (seen.has(word)) continue
      seen.add(word)
      out.push(word)
    }
  }
  return out
}

function collectRhymes(inputWord, candidateFamilies, relationType, excludeWords = new Set()) {
  const source = normalizeWordForLookup(inputWord)
  if (!source) return []
  const candidates = getCandidateWordsForFamilies(candidateFamilies)
  const results = []
  const seen = new Set()

  for (const candidate of candidates) {
    if (!candidate || candidate === source) continue
    if (excludeWords.has(candidate) || seen.has(candidate)) continue
    const score = scoreRhymeCandidate(source, candidate, relationType)
    if (score <= 0) continue
    seen.add(candidate)
    results.push({
      word: candidate,
      syllables: countWordSyllables(candidate),
      score,
      type: relationType,
    })
  }

  return dedupeAndSortRhymeList(results, 24)
}

function collectInternalRhymes(inputWord, excludeWords = new Set()) {
  const source = normalizeWordForLookup(inputWord)
  if (!source) return []
  const inputFamily = detectFamily(source)
  const inputSound = getFamilyVowelSound(inputFamily)
  const results = []
  const seen = new Set()

  for (const [candidate] of RHYME_DICTIONARY) {
    if (!candidate || candidate === source) continue
    if (excludeWords.has(candidate) || seen.has(candidate)) continue
    const candFamily = detectFamily(candidate)
    const sameSound = inputSound !== 'unknown' && getFamilyVowelSound(candFamily) === inputSound
    const sameFamily = candFamily === inputFamily
    const sharedSuffix = commonSuffixLength(source, candidate)

    if (!sameFamily && !sameSound && sharedSuffix < 3) continue

    const score = scoreRhymeCandidate(source, candidate, 'internal')
    if (score < 50) continue

    seen.add(candidate)
    results.push({
      word: candidate,
      syllables: countWordSyllables(candidate),
      score,
      type: 'internal',
    })
  }

  return dedupeAndSortRhymeList(results, 24)
}

function getRhymeTargetsCombined(rhymeSets) {
  const combined = []
  const seen = new Set()
  for (const key of ['perfect', 'near', 'slant']) {
    const list = rhymeSets[key] || []
    for (const item of list) {
      if (!item || !item.word || seen.has(item.word)) continue
      seen.add(item.word)
      combined.push(item)
    }
  }
  combined.sort((a, b) => b.score - a.score || a.syllables - b.syllables || a.word.localeCompare(b.word))
  return combined.slice(0, 12)
}

function getThemeHits(words, family) {
  const tokens = (words || [])
    .map(w => normalizeWordForLookup(w))
    .filter(Boolean)

  const hits = []
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    let score = 0
    for (const token of tokens) {
      if (keywords.includes(token)) score += 2
      else {
        for (const key of keywords) {
          if (token === key || token.includes(key) || key.includes(token)) {
            score += 1
            break
          }
        }
      }
    }

    if (family === 'F_IGHT' && theme === 'introspective' && (tokens.includes('night') || tokens.includes('tonight') || tokens.includes('midnight'))) {
      score += 2
    }

    if (family === 'F_UV' && theme === 'love') score += 1
    if (family === 'F_AY' && theme === 'hustle') score += 1
    if (family === 'F_OO' && theme === 'victory') score += 1

    if (score > 0) hits.push({ theme, score })
  }

  hits.sort((a, b) => b.score - a.score || a.theme.localeCompare(b.theme))
  return hits.slice(0, 3).map(item => item.theme)
}

function getCadenceFromSyllables(total) {
  if (total <= 6) return 'tight'
  if (total <= 10) return 'balanced'
  return 'loose'
}

function getDensityFromSyllables(total) {
  if (total <= 6) return 'low'
  if (total <= 10) return 'medium'
  return 'high'
}

function getCountWords(text) {
  return String(text || '')
    .replace(/\n/g, ' ')
    .split(/\s+/)
    .map(normalizeWordForLookup)
    .filter(Boolean)
}

function buildSuggestionPool(family, theme, cadence) {
  const familyBank = FAMILY_SUGGESTION_BANK[family]
  if (familyBank && familyBank[cadence]) return familyBank[cadence]
  const themeBank = {
    hustle: {
      tight: [
        'I been grinding every {rhyme}',
        'Built it from the ground to {rhyme}',
        'Turned the pressure into {rhyme}',
      ],
      balanced: [
        'I been grinding every single {rhyme}',
        'Turned the pressure into {rhyme}',
        'Kept my focus through the {rhyme}',
      ],
      loose: [
        'I been grinding every single day for the {rhyme}',
        'Turned every setback into {rhyme}',
        'Kept my head up through the {rhyme}',
      ],
    },
    love: {
      tight: [
        'I keep falling back in {rhyme}',
        'Still holding onto your {rhyme}',
        'Got me dreaming in the {rhyme}',
      ],
      balanced: [
        'I keep falling back in love with the {rhyme}',
        'Still holding onto your {rhyme}',
        'Got me dreaming in the {rhyme}',
      ],
      loose: [
        'I keep falling back in love beneath the {rhyme}',
        'Still holding onto your {rhyme}',
        'Got me dreaming in the {rhyme} tonight',
      ],
    },
    introspective: {
      tight: [
        'I keep thinking in the {rhyme}',
        'Quiet thoughts keep making {rhyme}',
        'Midnight moods feel so {rhyme}',
      ],
      balanced: [
        'I keep thinking in the {rhyme}',
        'Quiet thoughts keep making me {rhyme}',
        'Midnight moods keep staying {rhyme}',
      ],
      loose: [
        'I keep thinking in the {rhyme} until it fades',
        'Quiet thoughts keep making me more {rhyme}',
        'Midnight moods keep staying with me through the {rhyme}',
      ],
    },
    money: {
      tight: [
        'All this paper got me {rhyme}',
        'Now the whole room chasing {rhyme}',
        'Counting stacks until the {rhyme}',
      ],
      balanced: [
        'All this paper got me moving {rhyme}',
        'Now the whole room chasing the {rhyme}',
        'Counting stacks until the {rhyme}',
      ],
      loose: [
        'All this paper got me moving like I made it {rhyme}',
        'Now the whole room chasing the {rhyme}',
        'Counting stacks until the {rhyme} comes through',
      ],
    },
    pain: {
      tight: [
        'Still carrying this {rhyme}',
        'Turning all my scars to {rhyme}',
        'Healing slowly through the {rhyme}',
      ],
      balanced: [
        'Still carrying this {rhyme}',
        'Turning all my scars to something {rhyme}',
        'Healing slowly through the {rhyme}',
      ],
      loose: [
        'Still carrying this {rhyme} and I never fold',
        'Turning all my scars to something {rhyme}',
        'Healing slowly through the {rhyme} I hold',
      ],
    },
    victory: {
      tight: [
        'Now I’m standing at the {rhyme}',
        'Came from nothing, built to {rhyme}',
        'Watch me rise and take the {rhyme}',
      ],
      balanced: [
        'Now I’m standing at the {rhyme}',
        'Came from nothing, built to {rhyme}',
        'Watch me rise and take the {rhyme}',
      ],
      loose: [
        'Now I’m standing at the {rhyme} and looking back',
        'Came from nothing, built to {rhyme}',
        'Watch me rise and take the {rhyme} in full attack',
      ],
    },
  }

  const themeBank = themeBank[theme] || GENERIC_SUGGESTION_BANK
  return themeBank[cadence] || GENERIC_SUGGESTION_BANK[cadence]
}

function buildSuggestionLine({ family, theme, cadence, rhymeWord, index }) {
  const templates = buildSuggestionPool(family, theme, cadence)
  const template = templates[index % templates.length] || GENERIC_SUGGESTION_BANK[cadence][0]
  const cleanRhyme = normalizeWordForLookup(rhymeWord)
  return template.replace(/\{rhyme\}/g, cleanRhyme || rhymeWord).replace(/\s+/g, ' ').trim()
}

function detectInternalRhymesInLine(words) {
  const tokens = (words || []).map(normalizeWordForLookup).filter(Boolean)
  const pairs = []
  const seen = new Set()

  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      const a = tokens[i]
      const b = tokens[j]
      if (!a || !b || a === b) continue
      const key = a < b ? `${a}|${b}` : `${b}|${a}`
      if (seen.has(key)) continue

      const familyA = detectFamily(a)
      const familyB = detectFamily(b)
      const sharedSuffix = commonSuffixLength(a, b)
      const sameFamily = familyA === familyB
      const sameSound = getFamilyVowelSound(familyA) !== 'unknown' && getFamilyVowelSound(familyA) === getFamilyVowelSound(familyB)

      if (!sameFamily && !sameSound && sharedSuffix < 3) continue

      const score = scoreRhymeCandidate(a, b, 'internal')
      if (score < 55) continue

      seen.add(key)
      pairs.push({
        words: [a, b],
        score,
        type: 'internal',
        family: sameFamily ? familyA : undefined,
      })
    }
  }

  pairs.sort((a, b) => b.score - a.score)
  return pairs.slice(0, 8)
}

function detectFamily(origWord) {
  const input = normalizeWordForLookup(origWord)
  if (!input) return 'F_'

  if (FAMILY_CACHE[input]) return FAMILY_CACHE[input]

  const candidateForms = uniqueWords([
    input,
    input.replace(/-/g, ''),
    input.endsWith('e') ? input.slice(0, -1) : '',
    input.endsWith('es') ? input.slice(0, -2) : '',
    input.endsWith('ed') ? input.slice(0, -2) : '',
    input.endsWith('ing') ? input.slice(0, -3) : '',
  ].filter(Boolean))

  for (const form of candidateForms) {
    if (WORD_TO_FAMILY[form]) {
      FAMILY_CACHE[input] = WORD_TO_FAMILY[form]
      return FAMILY_CACHE[input]
    }
  }

  for (const form of candidateForms) {
    for (const [pattern, family] of SORTED_FAMILY_PATTERNS) {
      if (form.endsWith(pattern)) {
        FAMILY_CACHE[input] = family
        return family
      }
    }
  }

  if (input.endsWith('e') && input.length > 3 && !input.endsWith('ee')) {
    const withoutE = input.slice(0, -1)
    for (const [pattern, family] of SORTED_FAMILY_PATTERNS) {
      if (withoutE.endsWith(pattern)) {
        FAMILY_CACHE[input] = family
        return family
      }
    }
  }

  if (input.endsWith('er') && input.length > 3) {
    FAMILY_CACHE[input] = 'F_AIR'
    return 'F_AIR'
  }

  if (input.endsWith('or') && input.length > 3) {
    FAMILY_CACHE[input] = 'F_ORE'
    return 'F_ORE'
  }

  if (input.endsWith('re') && input.length > 3) {
    FAMILY_CACHE[input] = 'F_AIR'
    return 'F_AIR'
  }

  if (input.endsWith('tion') || input.endsWith('sion') || input.endsWith('cian')) {
    FAMILY_CACHE[input] = 'F_SHUN'
    return 'F_SHUN'
  }

  let heuristic = input
    .replace(/(ing|ed|es|s)$/, '')
    .replace(/[^aeiouy]+$/, '')

  if (!heuristic) {
    const tail = input.slice(-3)
    heuristic = tail.replace(/[^a-z]/g, '')
  }

  if (!heuristic) heuristic = input.slice(-2)

  const family = `F_${heuristic.toUpperCase()}`
  FAMILY_CACHE[input] = family
  return family
}

function getRhymes(inputWord) {
  const word = getLastMeaningfulWord(inputWord)
  if (!word) return { perfect: [], near: [], slant: [] }
  if (RHYME_CACHE[word]) return RHYME_CACHE[word]

  const detectedFamily = detectFamily(word)
  const perfectFamilies = [detectedFamily]
  const nearFamilies = getNearFamilies(detectedFamily)
  const vowelSound = getFamilyVowelSound(detectedFamily)
  const slantFamilies = uniqueWords(
    Object.values(VOWEL_SOUND_TO_FAMILIES).flat().filter(fam => {
      if (fam === detectedFamily) return false
      if (nearFamilies.includes(fam)) return false
      return vowelSound !== 'unknown' && getFamilyVowelSound(fam) === vowelSound
    })
  )

  const perfect = collectRhymes(word, perfectFamilies, 'perfect')
  const perfectWords = new Set(perfect.map(item => item.word))
  const near = collectRhymes(word, nearFamilies, 'near', perfectWords)
  const nearWords = new Set([...perfectWords, ...near.map(item => item.word)])
  const slant = collectRhymes(word, slantFamilies, 'slant', nearWords)

  const result = {
    perfect: perfect.slice(0, 24),
    near: near.slice(0, 24),
    slant: slant.slice(0, 24),
  }

  RHYME_CACHE[word] = result
  return result
}

function getAdvancedRhymes(word, options = {}) {
  const {
    multiSyllable = false,
    includeInternal = false,
    matchSyllableCount = false,
  } = options || {}

  const source = getLastMeaningfulWord(word)
  if (!source) {
    return includeInternal ? { perfect: [], near: [], slant: [], internal: [] } : { perfect: [], near: [], slant: [] }
  }

  const base = getRhymes(source)
  const inputSyl = countWordSyllables(source)

  const filterList = (list) => {
    let items = list.slice()
    if (multiSyllable) {
      items = items.filter(item => item.syllables >= 2)
    }
    if (matchSyllableCount) {
      items = items.filter(item => item.syllables === inputSyl)
    }
    return dedupeAndSortRhymeList(items, 24)
  }

  const perfect = filterList(base.perfect)
  const perfectWords = new Set(perfect.map(item => item.word))
  const near = filterList(base.near.filter(item => !perfectWords.has(item.word)))
  const nearWords = new Set([...perfectWords, ...near.map(item => item.word)])
  const slant = filterList(base.slant.filter(item => !nearWords.has(item.word)))

  const result = { perfect, near, slant }

  if (includeInternal) {
    const internal = collectInternalRhymes(source, new Set([
      ...perfect.map(item => item.word),
      ...near.map(item => item.word),
      ...slant.map(item => item.word),
    ]))
    result.internal = filterList(internal)
  }

  return result
}

function countWordSyllables(word) {
  if (!word) return 0
  const clean = normalizeWordForLookup(word)
  if (!clean) return 0
  if (SYLLABLE_CACHE[clean] != null) return SYLLABLE_CACHE[clean]

  if (EXCEPTION_SYLLABLES[clean] != null) {
    SYLLABLE_CACHE[clean] = EXCEPTION_SYLLABLES[clean]
    return SYLLABLE_CACHE[clean]
  }

  if (clean.includes('-')) {
    const parts = clean.split('-').filter(Boolean)
    if (parts.length > 1) {
      const total = parts.reduce((sum, part) => sum + countWordSyllables(part), 0)
      SYLLABLE_CACHE[clean] = Math.max(1, total)
      return SYLLABLE_CACHE[clean]
    }
  }

  if (clean.length <= 3) {
    SYLLABLE_CACHE[clean] = 1
    return 1
  }

  let wordToCount = clean

  if (wordToCount.endsWith('ies') && wordToCount.length > 3) {
    wordToCount = `${wordToCount.slice(0, -3)}y`
  }

  let syllables = (wordToCount.match(/[aeiouy]+/g) || []).length

  if (wordToCount.endsWith('e')) {
    if (!/(?:[aeiou]le|ye|ee|oe|ie|ue)$/.test(wordToCount)) {
      syllables -= 1
    }
  }

  if (/[^aeiou]le$/.test(wordToCount) && wordToCount.length > 2) {
    syllables += 1
  }

  if (wordToCount.endsWith('ed') && !/(?:ted|ded)$/.test(wordToCount)) {
    syllables -= 1
  }

  if (wordToCount.endsWith('es') && !/(?:ses|xes|zes|ches|shes|ges)$/.test(wordToCount)) {
    syllables -= 1
  }

  if (wordToCount.startsWith('mc')) syllables += 1
  if (wordToCount.match(/ia|io|eo|ii|ua/)) syllables += 1

  syllables = Math.max(1, syllables)
  SYLLABLE_CACHE[clean] = syllables
  return syllables
}

function countSyllables(text) {
  const source = Array.isArray(text) ? text.join('\n') : String(text || '')
  const lines = source.split('\n')

  return lines.map(line => {
    const trimmed = line == null ? '' : String(line).trim()
    if (!trimmed) {
      return {
        line: line ?? '',
        syllableCount: 0,
        density: 'low',
      }
    }

    const words = trimmed.split(/\s+/).filter(Boolean)
    let total = 0
    for (const w of words) total += countWordSyllables(w)

    return {
      line,
      syllableCount: total,
      density: getDensityFromSyllables(total),
    }
  })
}

function analyzeRhymeScheme(lines) {
  const sourceLines = Array.isArray(lines)
    ? lines.slice()
    : String(lines || '').split('\n')

  const cleanedLines = sourceLines
    .map(line => (line == null ? '' : String(line)).trim())
    .filter(Boolean)

  if (cleanedLines.length < 2) {
    return {
      scheme: 'none',
      confidence: 0,
      rhymesDetected: 0,
      patternStrength: 'weak',
    }
  }

  const groups = []
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let letterIndex = 0
  let scheme = ''
  let rhymesDetected = 0
  let totalMatchScore = 0

  for (const line of cleanedLines) {
    const words = line.split(/\s+/).filter(Boolean)
    const ending = getLastMeaningfulWord(words[words.length - 1] || '')
    if (!ending) {
      const newLetter = letters[letterIndex++] || 'Z'
      groups.push({ letter: newLetter, words: [ending] })
      scheme += newLetter
      continue
    }

    let bestGroup = null
    let bestScore = 0

    for (const group of groups) {
      const rep = group.words[group.words.length - 1]
      if (!rep) continue
      const score = scoreRhymeCandidate(ending, rep, 'perfect')
      const nearScore = Math.max(
        score,
        scoreRhymeCandidate(ending, rep, 'near'),
        scoreRhymeCandidate(ending, rep, 'slant'),
      )

      if (nearScore > bestScore) {
        bestScore = nearScore
        bestGroup = group
      }
    }

    if (bestGroup && bestScore >= 58) {
      bestGroup.words.push(ending)
      scheme += bestGroup.letter
      rhymesDetected += 1
      totalMatchScore += bestScore
    } else {
      const newLetter = letters[letterIndex++] || letters[letters.length - 1]
      groups.push({ letter: newLetter, words: [ending] })
      scheme += newLetter
    }
  }

  const avgScore = rhymesDetected > 0 ? totalMatchScore / rhymesDetected : 0
  const confidence = clamp(
    Math.round(
      (rhymesDetected / Math.max(1, cleanedLines.length - 1)) * 60 +
      (avgScore / 100) * 35 +
      (groups.some(g => g.words.length >= 2) ? 5 : 0)
    ),
    0,
    100
  )

  let patternStrength = 'weak'
  if (rhymesDetected >= 3 && avgScore >= 74) patternStrength = 'strong'
  else if (rhymesDetected >= 1 && avgScore >= 58) patternStrength = 'moderate'

  return {
    scheme: scheme || 'none',
    confidence,
    rhymesDetected,
    patternStrength,
  }
}

function generateLyricSuggestions(line) {
  const sourceLine = String(line || '').trim()
  const words = getCountWords(sourceLine)
  const lastWord = getLastMeaningfulWord(sourceLine)
  const detectedFamily = lastWord ? detectFamily(lastWord) : 'F_'
  const syllableCount = countWordSyllables(sourceLine ? sourceLine.split(/\s+/).filter(Boolean).join(' ') : '')
  const cadence = getCadenceFromSyllables(syllableCount)
  const themes = getThemeHits(words, detectedFamily)
  const rhymeSets = getAdvancedRhymes(lastWord || sourceLine, {
    multiSyllable: syllableCount > 6,
    includeInternal: true,
    matchSyllableCount: false,
  })

  const rhymeTargets = getRhymeTargetsCombined(rhymeSets)
  const internalRhymes = detectInternalRhymesInLine(words)

  const primaryTheme = themes[0] || 'hustle'
  const suggestions = []
  const used = new Set()

  const candidateTargets = []
  for (const item of rhymeTargets) {
    if (!item || !item.word || used.has(item.word)) continue
    used.add(item.word)
    candidateTargets.push(item)
    if (candidateTargets.length >= 6) break
  }

  if (!candidateTargets.length) {
    candidateTargets.push(
      { word: lastWord || 'day', syllables: countWordSyllables(lastWord || 'day'), score: 50, type: 'perfect' },
      { word: 'light', syllables: 1, score: 45, type: 'perfect' },
      { word: 'right', syllables: 1, score: 43, type: 'perfect' },
    )
  }

  const targetCount = clamp(Math.max(3, Math.min(6, candidateTargets.length)), 3, 6)
  for (let i = 0; i < targetCount; i++) {
    const target = candidateTargets[i % candidateTargets.length]
    const suggestion = buildSuggestionLine({
      family: detectedFamily,
      theme: primaryTheme,
      cadence,
      rhymeWord: target.word,
      index: i,
    })
    if (suggestion && !suggestions.includes(suggestion)) suggestions.push(suggestion)
  }

  while (suggestions.length < 3) {
    const fallback = buildSuggestionLine({
      family: detectedFamily,
      theme: primaryTheme,
      cadence,
      rhymeWord: lastWord || 'day',
      index: suggestions.length,
    })
    if (!suggestions.includes(fallback)) suggestions.push(fallback)
    else break
  }

  return {
    detectedFamily,
    rhymeTargets,
    internalRhymes,
    syllables: syllableCount,
    cadence,
    themes,
    suggestions: suggestions.slice(0, 6),
  }
}

function getSongStructureTemplate(type) {
  const templates = {
    'verse-chorus': [
      { section_type: 'verse', label: 'Verse 1', writing_tip: 'Set the scene. Introduce character, setting, or conflict.' },
      { section_type: 'chorus', label: 'Chorus', writing_tip: 'This is your emotional peak. Every word must earn its place.' },
      { section_type: 'verse', label: 'Verse 2', writing_tip: 'Expand the story or shift perspective.' },
      { section_type: 'chorus', label: 'Chorus', writing_tip: 'This is your emotional peak.' },
      { section_type: 'bridge', label: 'Bridge', writing_tip: 'Shift perspective or introduce contrast.' },
      { section_type: 'chorus', label: 'Chorus', writing_tip: 'This is your emotional peak.' }
    ],
    'aaba': [
      { section_type: 'verse', label: 'A (Verse)', writing_tip: 'Establish the main theme.' },
      { section_type: 'verse', label: 'A (Verse)', writing_tip: 'Develop the theme further.' },
      { section_type: 'bridge', label: 'B (Bridge)', writing_tip: 'Shift perspective or introduce contrast.' },
      { section_type: 'verse', label: 'A (Verse)', writing_tip: 'Return to the main theme for final impact.' }
    ],
    'verse-only': [
      { section_type: 'verse', label: 'Verse 1', writing_tip: 'Set the scene.' },
      { section_type: 'verse', label: 'Verse 2', writing_tip: 'Push the narrative forward.' },
      { section_type: 'verse', label: 'Verse 3', writing_tip: 'Bring the story to a climax.' }
    ],
    'hook-first': [
      { section_type: 'hook', label: 'Hook', writing_tip: 'Your most memorable phrase.' },
      { section_type: 'verse', label: 'Verse 1', writing_tip: 'Set the scene.' },
      { section_type: 'hook', label: 'Hook', writing_tip: 'Your most memorable phrase.' },
      { section_type: 'verse', label: 'Verse 2', writing_tip: 'Build on the initial scene.' },
      { section_type: 'bridge', label: 'Bridge', writing_tip: 'Shift perspective or introduce contrast.' },
      { section_type: 'hook', label: 'Hook', writing_tip: 'Your most memorable phrase.' }
    ],
    'extended': [
      { section_type: 'intro', label: 'Intro', writing_tip: 'Establish mood.' },
      { section_type: 'verse', label: 'Verse 1', writing_tip: 'Set the scene.' },
      { section_type: 'prechorus', label: 'Pre-Chorus', writing_tip: 'Build tension.' },
      { section_type: 'chorus', label: 'Chorus', writing_tip: 'This is your emotional peak.' },
      { section_type: 'verse', label: 'Verse 2', writing_tip: 'Advance the narrative.' },
      { section_type: 'prechorus', label: 'Pre-Chorus', writing_tip: 'Build tension.' },
      { section_type: 'chorus', label: 'Chorus', writing_tip: 'This is your emotional peak.' },
      { section_type: 'bridge', label: 'Bridge', writing_tip: 'Shift perspective.' },
      { section_type: 'outro', label: 'Outro', writing_tip: 'Release tension.' }
    ]
  }
  return templates[type] || templates['verse-chorus']
}

function getWritingPrompts(sectionType) {
  const prompts = {
    verse: [
      "Describe the exact moment before everything changed.",
      "Start with a physical detail — something you can see, hear, or touch.",
      "Write the first line as if you're speaking directly to one specific person."
    ],
    chorus: [
      "Summarize the main emotion in 4 simple words.",
      "What is the one thing you want them to remember?",
      "State the universal truth hidden in your story."
    ],
    bridge: [
      "Imagine 5 years have passed. What does it look like now?",
      "Flip the script: How does the other person feel?",
      "Change the rhythm entirely. Fast/staccato or long/drawn out."
    ]
  }
  const list = prompts[sectionType.toLowerCase()] || prompts.verse
  return list.sort(() => 0.5 - Math.random()).slice(0, 3)
}

module.exports = {
  getRhymes,
  getAdvancedRhymes,
  generateLyricSuggestions,
  countSyllables,
  analyzeRhymeScheme,
  getSongStructureTemplate,
  getWritingPrompts
}