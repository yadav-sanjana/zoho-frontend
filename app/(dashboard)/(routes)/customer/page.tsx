"use client"
import CustomerForm from '@/components/CustomerForm';
import CustomerTable from '@/components/CustomerTable';


const CustomerPage = () => {

  return (
    <div>

      {/* <div className='min-h-screen flex justify-items-stretch'> */}
        <CustomerForm />
       <div className='p-10'>
       <CustomerTable/>
       </div>
      {/* </div> */}

    </div>
  );
}

export default CustomerPage