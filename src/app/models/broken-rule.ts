import { BrokenField } from "./broken-field";

export class BrokenRule {	
	public message : string;    
    public fields : BrokenField[] = [];	
    public isBroken : boolean;
	constructor(){
		
	}
}
