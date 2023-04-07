import { useState } from "react";
import InvoiceModal from "../components/InvoiceModel";
import TableRow from "../components/TableRow";


const InvoiceTable: React.FC = () => {
  const [rows, setRows] = useState([
    {
      quantity: 0,
      price: 0,
      discountPercentage: 0,
      discount: 0,
      taxPercentage: 0,
      tax: 0,
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        quantity: 0,
        price: 0,
        discountPercentage: 0,
        discount: 0,
        taxPercentage: 0,
        tax: 0,
      },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newRows = [...rows];
    newRows[index].quantity = quantity;
    setRows(newRows);
  };

  const handlePriceChange = (index: number, price: number) => {
    const newRows = [...rows];
    newRows[index].price = price;
    setRows(newRows);
  };

  const handleDiscountPercentageChange = (
    index: number,
    discountPercentage: number
  ) => {
    const newRows = [...rows];
    newRows[index].discountPercentage = discountPercentage;
    setRows(newRows);
  };

  const handleDiscountChange = (index: number, discount: number) => {
    const newRows = [...rows];
    newRows[index].discount = discount;
    setRows(newRows);
  };

  const handleTaxPercentageChange = (index: number, taxPercentage: number) => {
    const newRows = [...rows];
    newRows[index].taxPercentage = taxPercentage;
    setRows(newRows);
  };

  const handleTaxChange = (index: number, tax: number) => {
    const newRows = [...rows];
    newRows[index].tax = tax;
    setRows(newRows);
  };

  const discountValueChnage = (index: number, discount: number) => {
    const newRows = [...rows];
    newRows[index].discount = discount;
    setRows(newRows);
  };

  const TaxValueChnage = (index: number, tax: number) => {
    const newRows = [...rows];
    newRows[index].tax = tax;
    setRows(newRows);
  };

  const calculateTotal = () => {
    let total = 0;
    rows.forEach((row) => {
      total += row.price * row.quantity - row.discount + row.tax;
    });
    return total;
  };

  const totalAmount = calculateTotal();

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr className="fs-4">
                    <th className="text-center"> Sr.No </th>
                    <th className="text-center"> Qty </th>
                    <th className="text-center"> Price </th>
                    <th className="text-center"> Discount % </th>
                    <th className="text-center"> Discount </th>
                    <th className="text-center"> Tax % </th>
                    <th className="text-center"> Tax </th>
                    <th className="text-center"> Total Price </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <>
                      <TableRow
                        key={index}
                        index={index}
                        quantity={row.quantity}
                        price={row.price}
                        discountPercentage={row.discountPercentage}
                        discount={row.discount}
                        taxPercentage={row.taxPercentage}
                        tax={row.tax}
                        onQuantityChange={handleQuantityChange}
                        onPriceChange={handlePriceChange}
                        onDiscountPercentageChange={
                          handleDiscountPercentageChange
                        }
                        onDiscountChange={handleDiscountChange}
                        onTaxPercentageChange={handleTaxPercentageChange}
                        onTaxChange={handleTaxChange}
                        handleDeleteRow={handleDeleteRow}
                        discountValueChnage={discountValueChnage}
                        TaxValueChnage={TaxValueChnage}
                      />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-md-12">
              <button
                id="add_row"
                className="border btn btn-default pull-left"
                onClick={handleAddRow}
              >
                Add Row
              </button>
            </div>
          </div>
          <div className="row clearfix" style={{ marginTop: "20px" }}>
            <div className="pull-right col-md-4">
              <table
                className="table table-bordered table-hover"
                id="tab_logic_total"
              >
                <tbody>
                  <tr className="fs-4">
                    <th className="text-center">Grand Total</th>
                    <td className="text-center">
                      <input
                        type="number"
                        name="totalPrice"
                        value={totalAmount.toFixed(2)}
                        className="form-control totalPrice"
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setOpen(true)}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <>
            <InvoiceModal
              showModal={isOpen}
              closeModal={setOpen}
              rows={rows}
              totalAmount={totalAmount}
            />
          </>
        )}
      </div>
    </>
  );
};

export default InvoiceTable;
