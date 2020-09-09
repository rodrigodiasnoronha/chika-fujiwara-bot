// funny commands
import { attack } from './funny/attack';
import { cry } from './funny/cry';
import { eightBall } from './funny/eightBall';
import { hug } from './funny/hug';
import { jankenpon } from './funny/jankenpon';
import { kiss } from './funny/kiss';
import { meow } from './funny/meow';
import { pat } from './funny/pat';
import { ping } from './funny/ping';
import { sad } from './funny/sad';
import { shame } from './funny/shame';
import { thinking } from './funny/thinking';
import { slap } from './funny/slap';
import { cake } from './funny/cake';
import { bite } from './funny/bite';
import { sleepy } from './funny/sleepy';
import { dodge } from './funny/dodge';
import { runaway } from './funny/runaway';

// help commands
import { helper } from './help/helper';

// moderation commands
import { ban } from './moderation/ban';
import { kick } from './moderation/kick';
import { prune } from './moderation/prune';

// extras commands
import { avatar } from './extras/avatar';
import { userInfo } from './extras/userinfo';
import { profile } from './extras/profile';
import { bio } from './extras/bio';
import { locale } from './extras/locale';
import { support } from './extras/support';

export default {
    help: {
        helper,
    },
    moderation: {
        ban,
        kick,
        prune,
    },
    funny: {
        attack,
        bite,
        cake,
        cry,
        dodge,
        eightBall,
        hug,
        jankenpon,
        kiss,
        meow,
        pat,
        ping,
        runaway,
        sad,
        shame,
        slap,
        sleepy,
        thinking,
    },
    extras: {
        avatar,
        userInfo,
        profile,
        bio,
        locale,
        support,
    },
};
