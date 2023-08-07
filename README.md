# BLOCKCHAIN

**METAMASK**

- Metamask: Kết nối với các dịch vụ mà Ethereum cung cấp
- Mua Crypto.
- Gửi hoặc nhận Crypto.
- Swap đồng này sang đồng khác
- Listing tài sản và record các hoạt động

**Ưu điểm:** 

- Dễ sử dụng
- Tuỳ chỉnh được phí gas
- An toàn cho người dùng vì public source code
- Tích hợp swap giữa các coin

**Nhược điểm:**

- Phí Swap khá cao
- Bảo mật kém hơn so với ví lạnh
- Rủi ro bảo mật thông tin và “lãng quên” từ khoá bí mật (Seed phrase)

**SMART CONTRACT**

- Etherum là một blockchain
- Người dùng thông thường: addresss,chứa tài sản, thực hiện được transaction
- Loại bỏ được bên trung gian

**TOKEN ERC-20**

- Ethereum có token riêng gọi là ETH(Ether)
- ETH được xem là native token (hay là coin) của Ethereum chain
- Các dự án phát triển trên Ethereum thông thường sẽ phát hành một đồng triền riêng cho dễ quản lý. Đó là token
- Tuỳ vào nhà tạo lập muốn sử dụng token vào việc gì của họ. Nhưng chúng có những đặc điểm chung (trong SM): có tên, mã viết tắt, lượng phát hành tối đa, đơn vị tính thập phân, có thể trans được ⇒ vì thế cần 1 chuẩn chung ERC 20

BACKDOOR: 1 cty có lượng lớn nhà đầu tư thì dùng backdoor để lấy data

REENTRANCY: coder viết gà bị hack.

**TÌM HIỂU NGÔN NGỮ LẬP TRÌNH SOLIDITY**

**Tất cả cac biến khi khởi tạo sẽ có giá trị mặc định.**

- Không có null hoặc undefined
- Uint=0
- bool=false
- string:””

**QUY TẮC CHUNG**

Biến public tự động khởi tạo getter tương ứng với tên biến

Lưu ý: Không thể tạo function trùng với tên biến

BOOLEAN:

INTEGER: 

- Uint8: từ 0 đến 255
- Int8L Từ -128 đến 127
- 2^8 ⇒ 2**8
- Uint256 ⇒ 2^256

Để tối ưu phí gas khi lưu 1 biến trong Blockchain

**ADDRESS**

- Mọi tương tác trên E đều dựa trên Address
- Mỗi add chiếm 20 byte
- Được dùng để chuyển ether từ SMC đến add và ngược lại thông qua các hàm transfer, send, call, value
- Trong các ver mới của Solidity sẽ có sự khác biệt giữa address và address sẽ được đánh dấu là payable

**STRING VÀ BYTES**

- Cả 2 đều là array nhưng string ko thể get được length hoặc indexx
- Bytes cho dữ liệu thô có độ dài tuỳ ý
- String cho các chuỗi UTF-8 có độ dài tuỳ ý
- String rất tốn kém ⇒ hạn chế sử dụng

![Screenshot (1).png](BLOCKCHAIN%20eb200a3af640447e813bd0b97db6470b/Screenshot_(1).png)

**STRING**

- Ko có .length, add, substring,..
- Ko có string comparison
- Rất tốn kém phí Gas

**EVM có 3 nơi để lưu trữ** 

- Storage: Nơi chứa các biên state trong contract. Mỗi contract sẽ có 1 bộ nhớ riêng, bộ nhớ k đổi mỗi lần call function. Do đó tốn phí rất nhiều khi sử dụng
- Memory: Nơi lưu trữ các dữ liệu tạm thời, thường được sử dụng trong các tham số và sử dụng external của hàm. Do đó, nó sẽ bị xoá đi sau khi kết thúc hàm nên chi phí sử dụng ít hơn
- Stack: nơi lưu trữ các biến local, nhỏ.

INTEGER: 

- Kiểu dữ liệu uint8: Nếu 0 mà -1 thì quay về 255. +1 thì quay về 0
- Bản mới thì giá trị 0 rồi thì ko cho - nữa. Nếu muốn thì thêm unchecked, nhưng giá trị vẫn giữ nguyên

**EOA & CONTRACT ACCOUNT:**

- Externaly ACC: chứa private key. Những acc ko nằm trong blockchain

**Muốn tạo:**

- Khởi tạo trans gọi đến SMC. Nó sẽ thực hiện từng cái 1
- Trong 1 trans có thể đi qua nhiều SMC

**Address:**

- Tất cả thông tin đều public
- Address có 2 thành phần quan trọng: balance và transfer(amount)

**GLOBAL OBJECTS:**

- Giúp chúng ta biết đc trans từ đâu đến và chuyện gì đang diễn biến bên trong SC
- 3 thuộc tính quan trọng:
- msg.sender: add của account khi khởi tạo trans
- msg.value: số lượng ether được chuyển vào
- now: timestamp hiện tại

**PAYABLE FUNCTION ADDRESSS**

- Function k thể nhận ether trừ khi đánh dấu là payable
- address payable myAddress
- Function myfunction() public payable {…}

Nếu function/addres k được đánh dấu là payable thì chương trình bị fail

CÁC KIỂU DỮ LIỆU NÂNG CAO:

- Enum
- Array
- Mapping: giống hashmaps. Khai báo đơn giản mapping(key⇒value) name;

mapping(address⇒bool) mapVar;

mapVar[someAddress] = true

- Tất cả các Value đều đc khởi tạo mặc định
- Mapping k có length
- Public state của mapping trở thành getter
- Iterable mapping có thể thực hiện được bằng cách sử dụng thư viện

STRUCT: giống class

- Sử dụng struct sẽ tốt hơn objects nếu muốn tối ưu về phí gas

**ARRAY:**

- Hỗ trợ cả fixed hoặc dynamic size
- Arr[k]: fixed size với k element . VD Arr[5]
- Arr[]: dynamic size.

Bao gồm 2 thuộc tính quan trọng length và push(element)

Lưu ý: arrays tốn rất nhiều gas. In fact, sử dụng mappings sẽ tối ưu hơn

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleMapping {
    mapping (address=>Balance) public balanceReceived;
    struct Payment {
        uint amount;
        uint timestamp;
    }
    struct Balance {
        uint totalBalance;
        uint numPayments;
        mapping(uint=>Payment) payments;
    }
function getBalance() public view returns (uint) {
    return address(this).balance;
}
function sendMoney() public payable {
    balanceReceived[msg.sender].totalBalance +=msg.value;
    Payment memory payment = Payment(msg.value,block.timestamp);
 balanceReceived[msg.sender].payments[balanceReceived[msg.sender].numPayments] = payment;
  balanceReceived[msg.sender].numPayments++;
}
function withdrawAllMoney(address payable _to) public {

    _to.transfer(getBalance());
}
function withdrawMoney(address payable _to, uint _amount) public {
        require(balanceReceived[msg.sender].totalBalance >= _amount,"not enough funds");
        balanceReceived[msg.sender].totalBalance -= _amount;
    _to.transfer(_amount);
}
}
```

TRANSACTION&ERROR

- Khi có lỗi thì Trans sẽ tự động reverse
- Require, assert, revert (trước đây là throw)
- Solidity không có catching
- Revert&require hỗ trợ chúng ta return error string

ASSERT VÀ REQUIRE

- Assert được sử dụng để validate invariants
- Require được sử dụng để validate input

THROW: BỊ LOẠI BỎ RỒI

REVERT: 

FUNCTION

**SETTER & GETTER FUNCTIONS:**

- Writing transaction: transactions
- Reading trans: call

Lưu ý: Tất cả mọi người đều có bản sao. Nếu ko thay đổi gì thì cũng k cần thông báo với mọi người

- View Function: read only & gọi các function khác
- Pure Function: ko cho phép read cũng như modify State
- Trước đây gọi là constant function

**FUNCTION VISIBILITY:**

- Public: có thể call được từ bên ngoài và bên trong
- Private: Chỉ call trong contract only
- External: có thể gọi từ contract khác và từ bên ngoài
- Internal: chỉ call trong contract only hoặc từ derived contract

Constructor: bắt đầu bằng constructor, chỉ gọi duy nhất 1 lần

**FALLBACK FUNCTION:** 

- Ko có tên.
- Được gọi khi thực hiện trans mà ko gọi bất kỳ function nào khác hoặc được gọi khi ko tìm thấy function call khi thực hiện transaction.

**Lưu ý:** Contract khi nhận Ether mà ko có fallback function hoặc function call sẽ văng lỗi exception

⇒ Nó giúp mình thực hiện nhận Ether như 1 transaction đơn giản.

**INHERITANCE** 

- Đa kế thừa
- Sử dụng super để truy cập base contract

**MODIFIERS:**

- Được dùng để check điều kiện
- Tái sử dụng được đoạn code check điều kiện nhiều nơi

**IMPORT A FILE**

- Một file chứa duy nhất 1 SM

**EVENT&RETURN VALUE**

- EVM có hỗ trợ chung ta log các thứ diễn ra trong SC
- Được sử dụng để:
- Trả về các giá trị từ trans
- Bên ngoài lắng nghe được
- Sử dụng ít data storage hơn
- Hàm dùng Writing trans không thể trả về giá trị

- Event được sử dụng để return value hoặc emit các event bên ngoài để lắng nghew
- Event data không thể dùng bên trong contract
- Các tham số event data trả về được đánh dấu là các indexed phục vụ việc tìm kiếm

**LIBRARY**

- Cách viết khá gióng với SC, chỉ khác là nó bắt đầu với keyword library
- Toàn bộ các thuộc tính sẽ được các contract trên Ethereum network reuse thông qua DELEGATECAL feature

Một khi deploy thì lib sẽ có một address cụ thể.

**DELEGATECALL (uỷ quyền)**

- Là một low level function
- Contract A delegatecall đến contract B
- Code trong contract B sẽ thực thi bên trong context của contract A
- Dùgn để upgrade contract A mà không cần thay đổi code bên trong

Tạo 2 token erc20 và giao dịch với nhau

ADmin: quyết định rate