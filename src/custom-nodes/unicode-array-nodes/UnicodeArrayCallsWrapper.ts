import 'format-unicorn';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { UnicodeArrayCallsWrapperTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayCallsWrapper extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[];

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @type {string}
     */
    private unicodeArrayCallsWrapperName: string;

    /**
     * @param unicodeArrayCallsWrapperName
     * @param unicodeArrayName
     * @param unicodeArray
     * @param options
     */
    constructor (
        unicodeArrayCallsWrapperName: string,
        unicodeArrayName: string,
        unicodeArray: string[],
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.length) {
            return;
        }

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayCallsWrapperName;
    };

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        return super.getNode();
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let keyName: string = Utils.getRandomVariableName();

        return NodeUtils.convertCodeToStructure(
            UnicodeArrayCallsWrapperTemplate().formatUnicorn({
                keyName: keyName,
                unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                unicodeArrayName: this.unicodeArrayName
            })
        );
    }
}
