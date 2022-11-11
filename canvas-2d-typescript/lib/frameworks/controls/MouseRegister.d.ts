import { Register } from './Register';
import { MouseEventType } from '../events/MouseEvent';
import { IComponent } from '../components/Core';
import { Point } from '../types/Point';
export declare class MouseRegister extends Register {
    private target;
    constructor();
    enable(): void;
    triggerEvent(target: IComponent, type: MouseEventType, point: Point): void;
}
//# sourceMappingURL=MouseRegister.d.ts.map