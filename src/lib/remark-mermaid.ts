import { visit } from "unist-util-visit";
import { Node } from "unist";

interface CodeNode extends Node {
    type: "code";
    lang?: string;
    value: string;
}

export function remarkMermaid() {
    return (tree: Node) => {
        visit(tree, "code", (node: CodeNode, index, parent: any) => {
            if (node.lang === "mermaid") {
                const value = node.value;
                const newNode = {
                    type: "mdxJsxFlowElement",
                    name: "Mermaid",
                    attributes: [
                        {
                            type: "mdxJsxAttribute",
                            name: "chart",
                            value: value,
                        },
                    ],
                    children: [],
                };

                parent.children.splice(index, 1, newNode);
            }
        });
    };
}
