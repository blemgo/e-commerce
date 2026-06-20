import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import type { Product } from "@shared/types";
import { productTableStyles } from "./ProductTable.styles";

const LOW_STOCK_THRESHOLD = 10;

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const renderStock = (qty: number) => {
  if (qty === 0) {
    return <Typography sx={productTableStyles.stockOut}>Out of stock</Typography>;
  }

  if (qty <= LOW_STOCK_THRESHOLD) {
    return <Typography sx={productTableStyles.stockLow}>{`Low · ${qty}`}</Typography>;
  }

  return <Typography>{`${qty} in stock`}</Typography>;
};

const tableHeadCells = [ "Product", "Category", "Price", "Stock", "Status" ];

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <TableContainer sx={productTableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadCells.map(cell => (
              <TableCell key={cell} sx={productTableStyles.headCell}>{cell}</TableCell>
            ))}
            <TableCell sx={productTableStyles.headCell} align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map(product => (
            <TableRow key={product.id} hover>
              <TableCell>
                <Box sx={productTableStyles.productCell}>
                  <Avatar
                    variant="rounded"
                    src={product.productImage}
                    alt={product.name}
                    sx={productTableStyles.thumbnail}
                  />
                  <Typography sx={productTableStyles.name}>{product.name}</Typography>
                </Box>
              </TableCell>

              <TableCell>
                {product.categories.map(category => category.categoryName).join(", ") || "—"}
              </TableCell>

              <TableCell>
                <Typography sx={productTableStyles.price}>{`₪${product.price}`}</Typography>
              </TableCell>

              <TableCell>{renderStock(product.qtyInStock)}</TableCell>

              <TableCell>
                <Chip
                  label={product.isActive ? "Active" : "Hidden"}
                  color={product.isActive ? "success" : "default"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>

              <TableCell align="right">
                <IconButton onClick={() => onEdit(product)} size="small">
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => onDelete(product)} size="small" color="error">
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ProductTable };
