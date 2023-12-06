import SalesPersonForm from '@/components/sales_person/SalesPersonForm';
import SalesPersonTable from '@/components/sales_person/SalesPersonTable';

const SalePerson = () => {
  return (
    <div>

      <SalesPersonForm />
      <div className='p-10'>
        <SalesPersonTable />
      </div>
    </div>
  );
}

export default SalePerson