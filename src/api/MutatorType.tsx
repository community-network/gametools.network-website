export type SparseBoolMutatorEntry = {
  index: number;
  value: boolean;
};

export type SparseBoolMutator = {
  defaultValue: boolean;
  siz: number;
  sparseValues: SparseBoolMutatorEntry[];
};

export type SparseIntEntity = {
  index: number;
  value: number;
};

export type SparseIntMutator = {
  defaultValue: number;
  size: number;
  sparseValues: SparseIntEntity[];
};

export type SparseFloatEntity = {
  index: number;
  value: number;
};

export type SparseFloatMutator = {
  defaultValue: number;
  size: number;
  sparseValues: SparseFloatEntity[];
};

export type BoolMutator = {
  boolValue: boolean;
};

export type FloatMutator = {
  floatValue: number;
  behaviour: number;
};

export type StringMutator = {
  stringValue: string;
};

export type IntMutator = {
  intValue: number;
  behaviour: number;
};

export type MutatorKind = {
  boolValue: BoolMutator[];
  stringValue: StringMutator[];
  floatValue: FloatMutator[];
  intValue: IntMutator[];
  boolSparse: SparseBoolMutator[];
  intSparse: SparseIntMutator[];
  floatSparse: SparseFloatMutator[];
};

export type Mutator = {
  name: string;
  category: string;
  kind: MutatorKind;
  mutatorId: string;
};

export type PlaygroundSparseFloatEntity = {
  index: number;
  value: number;
};

export type PlaygroundSparseFloatMutator = {
  defaultValue: number;
  size: number;
  sparseValues: PlaygroundSparseFloatEntity[];
};

export type PlaygroundFloatMutator = {
  floatValue: number;
};

export type PlaygroundMutatorKind = {
  boolValue: BoolMutator[];
  stringValue: StringMutator[];
  floatValue: PlaygroundFloatMutator[];
  intValue: IntMutator[];
  boolSparse: SparseBoolMutator[];
  intSparse: SparseIntMutator[];
  floatSparse: PlaygroundSparseFloatMutator[];
};

export type PlaygroundMutator = {
  name: string;
  category: string;
  kind: PlaygroundMutatorKind;
  mutatorId: string;
};
