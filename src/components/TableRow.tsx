import React, { useState } from "react";

interface TableRowProps {
  index: number;
  quantity: number;
  price: number;
  discountPercentage: number;
  discount: number;
  taxPercentage: number;
  tax: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onPriceChange: (index: number, price: number) => void;
  onDiscountPercentageChange: (
    index: number,
    discountPercentage: number
  ) => void;
  onDiscountChange: (index: number, discount: number) => void;
  onTaxPercentageChange: (index: number, taxPercentage: number) => void;
  onTaxChange: (index: number, tax: number) => void;
  handleDeleteRow: (index: number) => void;
  discountValueChnage: (index: number, discountValue: number) => void;
  TaxValueChnage: (index: number, tax: number) => void;
}


const TableRow: React.FC<TableRowProps> = ({
    index,
    quantity,
    price,
    discountPercentage,
    discount,
    taxPercentage,
    tax,
    onQuantityChange,
    onPriceChange,
    onDiscountPercentageChange,
    onDiscountChange,
    onTaxPercentageChange,
    onTaxChange,
    handleDeleteRow,
    discountValueChnage,
    TaxValueChnage,
  }) => {
    const [total, setTotal] = useState(0);
  
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(event.target.value);
      onQuantityChange(index, newQuantity);
      setTotal(newQuantity * price - discount + tax);
    };
  
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPrice = parseInt(event.target.value);
      onPriceChange(index, newPrice);
      setTotal(quantity * newPrice - discount + tax);
    };
  
    const handleDiscountChangeWithDiscount = (newDiscount: number) => {
    //   const newDiscountPercentage = (newDiscount / (quantity * price)) * 100;
      setTotal(quantity * price - newDiscount + tax);
    };
  
    const handleDiscountPercentageChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newDiscountPercentage = parseInt(event.target.value);
      onDiscountPercentageChange(index, newDiscountPercentage);
      const newDiscount = (quantity * price * newDiscountPercentage) / 100;
      discountValueChnage(index, newDiscount);
      handleDiscountChangeWithDiscount(newDiscount);
    };
  
    const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDiscount = parseInt(event.target.value);
      onDiscountChange(index, newDiscount);
    //   const newDiscountPercentage = (newDiscount / (quantity * price)) * 100;
      handleDiscountChangeWithDiscount(newDiscount);
    };
  
    const handleTaxChangeWithTax = (newTax: number) => {
      setTotal(quantity * price - discount + newTax);
    };
  
    const handleTaxPercentageChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newTaxPercentage = parseInt(event.target.value);
      onTaxPercentageChange(index, newTaxPercentage);
      const newTax = (quantity * price * newTaxPercentage) / 100;
      TaxValueChnage(index, newTax);
      handleTaxChangeWithTax(newTax);
    };
  
    const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTax = parseInt(event.target.value);
      onTaxChange(index, newTax);
      handleTaxChangeWithTax(newTax);
    };
  
    return (
      <>
        <tr id="addr1">
          <td>{index + 1}</td>
          <td>
            <input
              type="number"
              name="qty"
              placeholder="Enter Qty"
              className="form-control qty"
              step="0"
              min="0"
              defaultValue={quantity}
              onChange={handleQuantityChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="price"
              placeholder="Enter Unit Price"
              className="form-control price"
              step="0.00"
              min="0"
              defaultValue={price}
              onChange={handlePriceChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="discountPercentage"
              placeholder="0.00 %"
              className="form-control discountPercentage"
              defaultValue={discountPercentage}
              onChange={handleDiscountPercentageChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="discount"
              placeholder="0.00"
              className="form-control discount"
              readOnly
              value={discount}
              onChange={handleDiscountChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="taxPercentage"
              placeholder="0.00"
              className="form-control taxPercentage"
              defaultValue={taxPercentage}
              onChange={handleTaxPercentageChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="tax"
              placeholder="0.00"
              className="form-control tax"
              readOnly
              value={tax}
              onChange={handleTaxChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="total"
              placeholder="0.00"
              className="form-control total"
              readOnly
              value={total}
            />
          </td>
          <td>
            <div
              className="btn btn-default"
              onClick={() => handleDeleteRow(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3 "
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          </td>
        </tr>
      </>
    );
  };
  

  export default TableRow;