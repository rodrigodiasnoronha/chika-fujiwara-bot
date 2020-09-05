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

// help commands
import { helper } from './help/helper';

export default {
    help: {
        helper,
    },
    funny: {
        attack,
        cry,
        eightBall,
        hug,
        jankenpon,
        kiss,
        meow,
        pat,
        ping,
        sad,
        shame,
        thinking,
        slap,
    },
};
