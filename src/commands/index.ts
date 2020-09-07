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

// help commands
import { helper } from './help/helper';

export default {
    help: {
        helper,
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
        sad,
        shame,
        slap,
        sleepy,
        thinking,
    },
};
