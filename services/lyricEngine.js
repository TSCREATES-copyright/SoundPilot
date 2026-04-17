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
  ['all', 'F_ALL'], ['alk', 'F_ALL'], ['aul', 'F_ALL'],
  ['ack', 'F_ACK'], ['act', 'F_ACT'], ['ap', 'F_AP'], ['ab', 'F_AB'],
  ['at', 'F_AT'], ['an', 'F_AN'], ['am', 'F_AM'], ['ash', 'F_ASH'],
  ['air', 'F_AIR'], ['are', 'F_AIR'], ['ear', 'F_EAR'],
  ['tion', 'F_SHUN'], ['sion', 'F_SHUN'], ['cian', 'F_SHUN'],
  ['azer', 'F_AZR'], ['aser', 'F_AZR'], ['azor', 'F_AZR'],
]

function detectFamily(origWord) {
  const word = origWord.toLowerCase().trim()
  
  // Handle silent 'e' and common suffixes
  let searchWord = word
  if (word.endsWith('e') && !word.endsWith('ee') && word.length > 3) {
    searchWord = word.slice(0, -1)
  }

  for (const [pattern, family] of FAMILY_PATTERNS) {
    if (word.endsWith(pattern) || searchWord.endsWith(pattern)) {
      // Accuracy check for silent 'e'
      if (family === 'F_IP' && word.endsWith('ipe')) return 'F_IPE'
      if (family === 'F_IT' && word.endsWith('ite')) return 'F_ITE'
      if (family === 'F_ID' && word.endsWith('ide')) return 'F_IDE'
      return family
    }
  }

  // Slang endings (-er -> -air)
  if (word.endsWith('er') && word.length > 3) return 'F_AIR'

  return 'F_' + word.slice(-2).toUpperCase()
}

const NEAR_FAMILY_MAP = {
  'F_IGHT': ['F_ITE', 'F_IPE', 'F_INE'],
  'F_ITE': ['F_IGHT', 'F_IPE', 'F_INE'],
  'F_IPE': ['F_ITE', 'F_IGHT', 'F_INE'],
  'F_YPE': ['F_IPE', 'F_ITE', 'F_IGHT'],
  'F_EEN': ['F_EEL', 'F_EED', 'F_EEP', 'F_EEK'],
  'F_EEL': ['F_EEN', 'F_EED', 'F_EEP'],
  'F_EED': ['F_EEN', 'F_EEL', 'F_EEK'],
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
}

function getNearFamilies(family) {
  return NEAR_FAMILY_MAP[family] || []
}

const VOWEL_SOUND_MAP = {
  'long_i': ['F_IGHT','F_ITE','F_INE','F_IME','F_IRE','F_ILE','F_YPE','F_IPE'],
  'long_a': ['F_AY','F_AIN','F_ANE','F_AME','F_ACE','F_AZE','F_AIR','F_AZR'],
  'long_e': ['F_EEN','F_EEL','F_EED','F_EEP','F_EEK','F_ELL'],
  'long_o': ['F_ONE','F_OLD','F_OW','F_ONG','F_ORE','F_ORN'],
  'long_u': ['F_OO','F_OOL','F_OOM','F_OON','F_OOD'],
  'short_i': ['F_ILL','F_ING','F_INK','F_IP','F_IT','F_IG','F_ID'],
  'short_a': ['F_ACK','F_AP','F_AB','F_AT','F_AN','F_AM','F_ASH'],
  'short_o': ['F_OCK','F_OP','F_OT','F_OB','F_OG'],
  'short_u': ['F_UST','F_USH','F_UV','F_UG','F_UB','F_UN','F_UM','F_UNG','F_UNK','F_US','F_SHUN'],
  'ar_sound': ['F_ART','F_ARK','F_ARD','F_ARM'],
  'aw_sound': ['F_ALL','F_ORT','F_ORD'],
  'ow_sound': ['F_OUND','F_OWN','F_OUT'],
  'ood_sound': ['F_OOD'],
}

function getVowelSound(family) {
  for (const [sound, families] of Object.entries(VOWEL_SOUND_MAP)) {
    if (families.includes(family)) return sound
  }
  return 'unknown'
}

function getRhymes(inputWord) {
  const word = inputWord.toLowerCase().trim()
  if (!word) return { perfect: [], near: [], slant: [] }

  const detectedFamily = detectFamily(word)

  const perfect = RHYME_DICTIONARY
    .filter(e => e[1] === detectedFamily && e[0] !== word)
    .map(e => ({ word: e[0], syllables: countWordSyllables(e[0]) }))

  const nearFamilies = getNearFamilies(detectedFamily)
  const near = RHYME_DICTIONARY
    .filter(e => nearFamilies.includes(e[1]) && e[1] !== detectedFamily && e[0] !== word)
    .map(e => ({ word: e[0], syllables: countWordSyllables(e[0]) }))

  const vowelSound = getVowelSound(detectedFamily)
  const slant = RHYME_DICTIONARY
    .filter(e => getVowelSound(e[1]) === vowelSound
      && e[1] !== detectedFamily
      && !nearFamilies.includes(e[1])
      && e[0] !== word)
    .map(e => ({ word: e[0], syllables: countWordSyllables(e[0]) }))

  return {
    perfect: [...new Map(perfect.map(x => [x.word, x])).values()].slice(0, 24),
    near: [...new Map(near.map(x => [x.word, x])).values()].slice(0, 24),
    slant: [...new Map(slant.map(x => [x.word, x])).values()].slice(0, 24)
  }
}

function countWordSyllables(word) {
  if (!word) return 0
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return 1
  return w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
          .replace(/^y/, '')
          .match(/[aeiouy]{1,2}/g)?.length || 1
}

function countSyllables(text) {
  const lines = text.split('\n')
  return lines.map(line => {
    const words = line.trim().split(/\s+/)
    if (words.length === 1 && words[0] === '') return { line, syllableCount: 0 }
    let total = 0
    words.forEach(w => {
      if (w) total += countWordSyllables(w)
    })
    return { line, syllableCount: total }
  })
}

function analyzeRhymeScheme(lines) {
  if (!lines || lines.length < 2) return { scheme: 'none', confidence: 0 }
  const schemeLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let currentLetterIdx = 0
  const endingSoundMap = {}
  let pattern = ''
  
  for (const line of lines) {
    const cleanLine = line.trim()
    if (!cleanLine) continue
    const words = cleanLine.split(/\s+/)
    const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, '')
    
    let matchedLetter = null
    for (const [key, value] of Object.entries(endingSoundMap)) {
      if (value.includes(lastWord) || getRhymes(lastWord).perfect.some(rw => value.includes(rw.word))) {
        matchedLetter = key
        endingSoundMap[key].push(lastWord)
        break
      }
    }
    
    if (matchedLetter) {
        pattern += matchedLetter
    } else {
        const letter = schemeLetters[currentLetterIdx++]
        endingSoundMap[letter] = [lastWord]
        pattern += letter
    }
  }
  
  if (pattern.length < 2) return { scheme: 'none', confidence: 0 }
  return { scheme: pattern, confidence: 80 }
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
  countSyllables,
  analyzeRhymeScheme,
  getSongStructureTemplate,
  getWritingPrompts
}