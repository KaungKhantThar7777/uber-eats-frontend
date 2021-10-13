import { useMutation, useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import {
  GetOrder,
  GetOrderVariables,
  OrderStatus,
  EditOrder,
  EditOrderVariables,
  OrderUpdates,
  OrderUpdatesVariables,
} from "../api-types";
import { Spinner } from "../components/Spinner";
import { FULL_ORDER_FRAGMENT } from "../fragments";
import { useMe } from "../hooks/useMe";

const GET_ORDER = gql`
  query GetOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      error
      ok
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const EDIT_ORDER = gql`
  mutation EditOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      error
      ok
    }
  }
`;

const ORDER_UPDATES = gql`
  subscription OrderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;
const Order: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery<GetOrder, GetOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        orderId: +id,
      },
    },
  });
  const [editOrder] = useMutation<EditOrder, EditOrderVariables>(EDIT_ORDER);
  const { data: orderUpdates } = useSubscription<OrderUpdates, OrderUpdatesVariables>(
    ORDER_UPDATES,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  console.log({ orderUpdates });
  const { data: meData } = useMe();
  if (loading) {
    return <Spinner />;
  }
  const order = data?.getOrder.order;

  return (
    <div className=" w-screen flex justify-center mt-6">
      <div className=" w-full max-w-md  p-10  shadow-xl">
        <h3 className="  text-2xl text-center mb-5">
          Order #<span className=" font-bold">{id}</span>
        </h3>
        <div className="border-b-2 my-2 flex items-center">
          <p className="mr-5 w-1/4">Restaurant: </p> {order?.restaurant.name}
        </div>
        <div className="border-b-2 my-2 flex items-center">
          <p className="mr-5 w-1/4">Customer: </p> {order?.customer.email}
        </div>
        <div className="border-b-2 my-2 flex items-center">
          <p className="mr-5 w-1/4">Driver: </p> {order?.driver ? order.driver.email : "Not yet"}
        </div>
        <div className="border-b-2 my-2 flex items-center">
          <p className="mr-5 w-1/4">Total: </p> ${order?.total}
        </div>
        <div className="border-b-2 my-2 flex items-center">
          <p className="mr-5 w-1/4">Status: </p>{" "}
          <span className=" text-lime-600 font-medium text-lg">{order?.status}</span>
        </div>
        <div className="text-center mt-5">
          {meData?.me?.id === order?.restaurant.owner.id && order?.status === OrderStatus.Pending && (
            <button
              className="btn btn-primary px-4"
              onClick={() =>
                editOrder({
                  variables: {
                    input: {
                      orderId: +id,
                      status: OrderStatus.Cooking,
                    },
                  },
                })
              }
            >
              Start Cooking
            </button>
          )}

          {meData?.me?.id === order?.restaurant.owner.id && order?.status === OrderStatus.Cooking && (
            <button
              className="btn btn-primary px-4"
              onClick={() =>
                editOrder({
                  variables: {
                    input: {
                      orderId: +id,
                      status: OrderStatus.Cooked,
                    },
                  },
                })
              }
            >
              Finish Cooking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
