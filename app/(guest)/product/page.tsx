
// function Products() {
 
//   return (
//     <div className="p-4">
      
//     </div>
//   );
// }

// export default Products
import { useState } from 'react';
import { Select, Input, Form } from 'antd';

const { Option } = Select;

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(undefined);
  const [hargaPerHari, setHargaPerHari] = useState('');
  const [hargaPerBulan, setHargaPerBulan] = useState('');

  const options = [
    { value: 'perhari', label: 'Harga Per Hari' },
    { value: 'campur', label: 'Harga Campur' },
  ];

  const handleSelectChange = (value) => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected || {});
  };

  const handleHargaPerHariChange = (e) => {
    setHargaPerHari(e.target.value);
  };

  const handleHargaPerBulanChange = (e) => {
    setHargaPerBulan(e.target.value);
  };

  return (
    <Form>
      <Form.Item label="Pilih Jenis Harga">
        <Select value={selectedOption.value} onChange={handleSelectChange}>
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {selectedOption.value === 'perhari' && (
        <Form.Item label="Harga Per Hari">
          <Input value={hargaPerHari} onChange={handleHargaPerHariChange} />
        </Form.Item>
      )}

      {selectedOption.value === 'campur' && (
        <>
          <Form.Item label="Harga Per Hari">
            <Input value={hargaPerHari} onChange={handleHargaPerHariChange} />
          </Form.Item>
          <Form.Item label="Harga Per Bulan">
            <Input value={hargaPerBulan} onChange={handleHargaPerBulanChange} />
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default MyForm;
