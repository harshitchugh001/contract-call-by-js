const {
  AeSdk,
  MemoryAccount,
  Node,
  CompilerHttp,
} = require("@aeternity/aepp-sdk");

const node = new Node("https://testnet.aeternity.io");

const compiler = new CompilerHttp("https://v7.compiler.aepps.com");

const account = new MemoryAccount(
  "2fcd1b5b3434ca8b465e030aa9db42b30c71b37eab2bcd527039bd89f650db68d844c73b26e3b35cc46aacfddec678298718a9ee1e5872f28febfe92908bd5c9"
);
let aci = [
  {
    namespace: {
      name: "ListInternal",
      typedefs: [],
    },
  },
  {
    namespace: {
      name: "List",
      typedefs: [],
    },
  },
  {
    namespace: {
      name: "String",
      typedefs: [],
    },
  },
  {
    contract: {
      functions: [
        {
          arguments: [],
          name: "init",
          payable: false,
          returns: "CryptoHamster.state",
          stateful: true,
        },
        {
          arguments: [],
          name: "read_test_value",
          payable: false,
          returns: "int",
          stateful: false,
        },
        {
          arguments: [],
          name: "return_caller",
          payable: false,
          returns: "address",
          stateful: false,
        },
        {
          arguments: [],
          name: "cause_error",
          payable: false,
          returns: "unit",
          stateful: false,
        },
        {
          arguments: [
            {
              name: "one",
              type: "int",
            },
            {
              name: "two",
              type: "int",
            },
          ],
          name: "add_test_value",
          payable: false,
          returns: "int",
          stateful: true,
        },
        {
          arguments: [
            {
              name: "one",
              type: "int",
            },
            {
              name: "two",
              type: "int",
            },
          ],
          name: "locally_add_two",
          payable: false,
          returns: "int",
          stateful: false,
        },
        {
          arguments: [
            {
              name: "one",
              type: "int",
            },
            {
              name: "two",
              type: "int",
            },
          ],
          name: "statefully_add_two",
          payable: false,
          returns: "int",
          stateful: true,
        },
        {
          arguments: [
            {
              name: "hamster_name",
              type: "string",
            },
          ],
          name: "create_hamster",
          payable: false,
          returns: {
            tuple: [],
          },
          stateful: true,
        },
        {
          arguments: [
            {
              name: "name",
              type: "string",
            },
          ],
          name: "name_exists",
          payable: false,
          returns: "bool",
          stateful: false,
        },
        {
          arguments: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "test",
              type: {
                option: ["int"],
              },
            },
          ],
          name: "get_hamster_dna",
          payable: false,
          returns: "int",
          stateful: false,
        },
        {
          arguments: [
            {
              name: "name",
              type: "string",
            },
          ],
          name: "test",
          payable: false,
          returns: "hash",
          stateful: false,
        },
      ],
      kind: "contract_main",
      name: "CryptoHamster",
      payable: false,
      state: {
        record: [
          {
            name: "index",
            type: "int",
          },
          {
            name: "map_hamsters",
            type: {
              map: ["string", "CryptoHamster.hamster"],
            },
          },
          {
            name: "testvalue",
            type: "int",
          },
        ],
      },
      typedefs: [
        {
          name: "hamster",
          typedef: {
            record: [
              {
                name: "id",
                type: "int",
              },
              {
                name: "name",
                type: "string",
              },
              {
                name: "dna",
                type: "int",
              },
            ],
          },
          vars: [],
        },
      ],
    },
  },
];
let bytecode =
  "cb_+QNgRgOgD8C65Cct2gewQItnBo0JiiYH4+dLcI5BxVu+ys5ZAdzAuQMyuQHG/gnTQuECNwF3l0AbBAAA/hUorB0CNwJ3BzcADAKCDAEADAECJwwGDwICLZqEhAACEQKCAQM//h+V8s4ANwF3Fy8YhAAA/iA5bFwANwBHAFUAAP43Bfq6ADcBdzcADAEAAgMRH5XyziYABwwG+wNVTmFtZSBpcyBhbHJlYWR5IHRha2VuDAEAAgMRV7sSXQwBAAQDERUorB3+RNZEHwA3ADcAGg6ELwAaDoICGg6GVAEDP/5XuxJdAjcBdwcMAoJYAAIDEa7KGgoVABQAAP5muIyJADcCBwcHFBaGAAIBAob+bk/Q+wA3AgcHBxQWhgACFBQAAgD+e5NrTAA3ADcA+wM5cmVxdWlyZSBmYWlsZWT+fXIK5AA3AAcBAob+kosgNgA3AXeXQAwBAAQDEQnTQuH+qQiYRgA3AneHAjcANwEHBwwBAAIDER+V8s4HDAb7A41UaGVyZSBpcyBubyBoYW1zdGVyIHdpdGggdGhhdCBuYW1lIRoKBIQrGgYEACgsBAYA/q7KGgoCNwAHWQASVgIACD4ABAJGOgIAAD8IAgD7A01ibG9ja2hhc2ggbm90IGZvdW5k/ve0sIYANwIHBwcUFAACALkBYy8PEQnTQuExLlN0cmluZy5zaGEzERUorB2lLkNyeXB0b0hhbXN0ZXIuY3JlYXRlX2hhbXN0ZXJfYnlfbmFtZV9kbmERH5Xyzi1uYW1lX2V4aXN0cxEgOWxcNXJldHVybl9jYWxsZXIRNwX6ujljcmVhdGVfaGFtc3RlchFE1kQfEWluaXQRV7sSXYkuQ3J5cHRvSGFtc3Rlci5nZW5lcmF0ZV9yYW5kb21fZG5hEWa4jIlJc3RhdGVmdWxseV9hZGRfdHdvEW5P0Ps5YWRkX3Rlc3RfdmFsdWURe5NrTC1jYXVzZV9lcnJvchF9cgrkPXJlYWRfdGVzdF92YWx1ZRGSiyA2EXRlc3QRqQiYRj1nZXRfaGFtc3Rlcl9kbmERrsoaCqkuQ3J5cHRvSGFtc3Rlci5nZXRfYmxvY2tfaGFzaF9ieXRlc19hc19pbnQR97Swhj1sb2NhbGx5X2FkZF90d2+CLwCFNy40LjAAk5SuzQ==";

const main = async () => {
  const aeSdk = new AeSdk({
    nodes: [{ name: "testnet", instance: node }],
    accounts: [account],
    onCompiler: compiler,
  });
  let sourceCode = `
  @compiler >= 6
  
  include "String.aes"
  
  contract CryptoHamster =
  
      record state = {
          index : int, 
          map_hamsters : map(string, hamster), 
          testvalue: int}
  
      record hamster = {
          id : int,
          name : string,
          dna : int}
  
      stateful entrypoint init() = 
          { index = 1,
              map_hamsters = {},
              testvalue = 42}
      
      public entrypoint read_test_value() : int =
          state.testvalue
      
      public entrypoint return_caller() : address =
          Call.caller
  
      public entrypoint cause_error() : unit =
          require(2 == 1, "require failed") 
  
      public stateful entrypoint add_test_value(one: int, two: int) : int =
          put(state{testvalue = one + two})
          one + two
      
      public entrypoint locally_add_two(one: int, two: int) : int =
          one + two
      
      public stateful entrypoint statefully_add_two(one: int, two: int) : int=
          put(state{testvalue = one + two})
          state.testvalue
      
      stateful entrypoint create_hamster(hamster_name: string) =
          require(!name_exists(hamster_name), "Name is already taken")
          let dna : int = generate_random_dna(hamster_name)
          create_hamster_by_name_dna(hamster_name, dna)
  
      entrypoint name_exists(name: string) : bool =
          Map.member(name, state.map_hamsters)
  
      entrypoint get_hamster_dna(name: string, test: option(int)) : int =
          require(name_exists(name), "There is no hamster with that name!")
  
          let needed_hamster : hamster = state.map_hamsters[name]
  
          needed_hamster.dna
  
      private stateful function create_hamster_by_name_dna(name: string, dna: int) =
          let new_hamster : hamster = {
              id = state.index,
              name = name,
              dna = dna}
  
          put(state{map_hamsters[name] = new_hamster})
          put(state{index = (state.index + 1)})
  
      private function generate_random_dna(name: string) : int =
          get_block_hash_bytes_as_int() - Chain.timestamp + state.index
  
      private function get_block_hash_bytes_as_int() : int =
          switch(Chain.block_hash(Chain.block_height - 1))
              None => abort("blockhash not found")
              Some(bytes) => Bytes.to_int(bytes)
  
      entrypoint test(name: string) : hash =
          String.sha3(name)`;
  const contract = await aeSdk.initializeContract({ sourceCode });
  // const contract = await aeSdk.initializeContract({ aci, bytecode,address: "ct_2DMSpgyU6d7ouFL5uiuzMLaHdqXGYUYxaJffgte1iFt9JSKmUY" })
  // const contract = await aeSdk.initializeContract({ aci, bytecode })
  console.log("contract", contract);
  const init = await contract.init();
  // const
  // const tx1 = await contract.read_test_value()
  // const tx = await contract.return_caller()
  // const sum = await contract.add_test_value(3,4)
  // const tx = await contract.init()

  
  console.log("init",init)
  // console.log("tx",tx1.decodedResult)
  // console.log("tx",sum.decodedResult)
};
main();
