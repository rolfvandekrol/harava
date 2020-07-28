import * as ts from 'typescript';

const printer: ts.Printer = ts.createPrinter({
  removeComments: false
});

let sourceFile: ts.SourceFile =
  ts.createSourceFile('test.ts', '', ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);

const a = ts.createVariableStatement(
  ts.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration("a", undefined, ts.createArrowFunction([], [], [
      ts.createParameter([], [], undefined, 'x', undefined, ts.createTypeReferenceNode('number', []))
    ], undefined, undefined, ts.createBinary(ts.createIdentifier('x'), ts.SyntaxKind.AsteriskToken, ts.createLiteral(2))))
  ], ts.NodeFlags.Const)
);

const b = ts.createVariableStatement(
  ts.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration("b", undefined, ts.createArrowFunction([], [], [
      ts.createParameter([], [], undefined, 'x', undefined, ts.createTypeReferenceNode('number', []))
    ], undefined, undefined, ts.createBinary(ts.createIdentifier('x'), ts.SyntaxKind.AsteriskToken, ts.createLiteral(3))))
  ], ts.NodeFlags.Const)
);

const c = ts.createVariableStatement(
  ts.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
  ts.createVariableDeclarationList([
    ts.createVariableDeclaration("c", undefined, ts.createArrowFunction([], [], [
      ts.createParameter([], [], undefined, 'x', undefined, ts.createTypeReferenceNode('number', []))
    ], undefined, undefined, ts.createBinary(ts.createIdentifier('x'), ts.SyntaxKind.AsteriskToken, ts.createLiteral(4))))
  ], ts.NodeFlags.Const)
);

ts.addSyntheticLeadingComment(a, ts.SyntaxKind.MultiLineCommentTrivia, "*\n * Dit is een\n * test\n ", true);

type StatementList = (ts.Statement | ts.Statement[])[];

const print = (l: StatementList, fileName: string): string =>
  printStatementList(l, ts.createSourceFile(fileName, '', ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS));

const printStatementList = (l: StatementList, f: ts.SourceFile): string =>
  l.map(s => printStatementOrGroup(s, f)).join("\n");

const printStatementOrGroup = (s: ts.Statement | ts.Statement[], f: ts.SourceFile): string =>
  Array.isArray(s) ? printStatementGroup(s, f) : printStatement(s, f);

const printStatementGroup = (l: ts.Statement[], f: ts.SourceFile): string =>
  l.map(s => printStatement(s, f)).join("");

const printStatement = (s: ts.Statement, f: ts.SourceFile): string =>
  printer.printFile(ts.updateSourceFileNode(f, [s]));

// console.log(printer.printNode(ts.EmitHint.Expression, a, sourceFile) );
// console.log(printer.printFile(sourceFile) )

console.log(print([
  [a, b], c
], 'test.ts'));